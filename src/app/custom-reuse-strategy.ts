import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';
import { ComponentRef } from '@angular/core';

interface DetachedRouteHandleExt extends DetachedRouteHandle {
  componentRef: ComponentRef<any>;
}

interface RouteCacheRecord {
  handle: DetachedRouteHandleExt;
  /**
   * For unclear reasons, when the navigation starts, `retrieve` is called
   * without calling `shouldAttach` first (from `createRouterState`).
   * This flag is used to ignore those calls. :-\
   * */
  shouldAttachCalled: boolean;
}

export class CustomReuseStrategy implements RouteReuseStrategy {
  private routeCache = new Map<string, RouteCacheRecord>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log(`shouldDetach <${this.getSnapshotKey(route)}>`, route);
    const shouldDetach = !this.isToBeIgnored(route, 'shouldDetach');
    console.log(`shouldDetach:`, shouldDetach ? 'YES' : 'NO');
    return shouldDetach;
  }

  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandleExt | null
  ): void {
    const key = this.getSnapshotKey(route);

    console.log(`${detachedTree === null ? '(null) ' : ''}store <${key}>`, route, detachedTree);

    if (!detachedTree || this.isToBeIgnored(route, 'store')) {
      return;
    }

    const previousStored = this.routeCache.get(key);
    if (previousStored) {
      if (previousStored.handle.componentRef === detachedTree.componentRef) {
        console.log(
          'store: previous componentRef === detachedTree.componentRef'
        );
      } else {
        console.log('store: destroying previousStored');
        previousStored.handle.componentRef.destroy();
      }
    }

    this.routeCache.set(key, {
      handle: detachedTree,
      shouldAttachCalled: false
    });

    if (detachedTree) {
      this.callHook(detachedTree, 'ngOnDetach');
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getSnapshotKey(route);
    const stored = this.routeCache.get(key);
    const destroyed = !!(
      stored && stored.handle.componentRef.hostView.destroyed
    );
    const msgStatus = destroyed ? 'DESTROYED' : stored ? 'FOUND' : 'NOT FOUND';
    console.log(`shouldAttach <${key}> ${msgStatus}`, route);
    const shouldAttach =
      !destroyed && !!stored && !this.isToBeIgnored(route, 'shouldAttach');
    if (shouldAttach) {
      stored.shouldAttachCalled = true;
    }
    return shouldAttach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandleExt | null {
    const key = this.getSnapshotKey(route);
    const stored = this.routeCache.get(key);
    const destroyed = !!(
      stored && stored.handle.componentRef.hostView.destroyed
    );
    const shouldBeRetrieved =
      !destroyed && !!stored && stored.shouldAttachCalled;

    console.log(`retrieve <${key}>`, shouldBeRetrieved, route);

    if (destroyed) {
      console.log('%c' + `retrieve <${key}>: DESTROYED`, 'color: #0a0');
      this.routeCache.delete(key);
    }

    if (shouldBeRetrieved) {
      stored.shouldAttachCalled = false;
      if (this.isToBeIgnored(route, 'retrieve')) {
        return null;
      }
      const detachedTree = stored.handle;
      this.callHook(detachedTree, 'ngOnAttach');
      return detachedTree;
    }

    if (this.isToBeIgnored(route, 'pre-retrieve')) {
      return null;
    }

    return stored ? stored.handle : null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    const result = future.routeConfig === curr.routeConfig; // from DefaultRouteReuseStrategy
    console.log('shouldReuseRoute', result, curr, future);
    return result;
  }

  private getSnapshotKey(snapshot: ActivatedRouteSnapshot): string {
    return snapshot.pathFromRoot.join('->');
  }

  private isToBeIgnored(route: ActivatedRouteSnapshot, msg: string) {
    if (!route.routeConfig) {
      console.log(`${msg}: !route.routeConfig`);
      return true;
    }

    if (route.routeConfig.loadChildren) {
      console.log(`${msg}: loadChildren`);
      return true;
    }

    if (route.children.length) {
      console.log(`${msg}: has children`);
      return true;
    }

    return false;
  }

  private callHook(
    detachedTree: DetachedRouteHandleExt,
    hookName: string
  ): void {
    const componentRef = detachedTree.componentRef;
    if (
      componentRef &&
      componentRef.instance &&
      typeof componentRef.instance[hookName] === 'function'
    ) {
      componentRef.instance[hookName]();
    }
  }
}
