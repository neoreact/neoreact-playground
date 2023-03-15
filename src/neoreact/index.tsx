import React, { DOMElement, JSXElementConstructor, ReactElement, ReactNode } from "react";
import {
  NeoReact as INeoReact,
  Configuration,
  Service,
  NeoExtension,
  RenderService
} from "./src/core";

export class NeoReact<T> implements INeoReact<T> {
  private extension: NeoExtension = {};

  constructor(
    private config: Configuration<T>,
    private renderer: ReactDOM.Renderer
  ) {
    for (const key in this.config.extensions) {
      const extension = this.config.extensions[key];
      extension.func(this.extension);
    }
  }

  add(service: Service<T>): () => void {
    this.config.services.push(service);
    return () => this.render();
  }

  create() { }

  public render() {
    const component = this.config.component;

    this.renderer((component ?? <div></div>) as React.ReactElement, document.querySelector(this.config.target));

    let renderByService: RenderService = {};

    for (const service of this.config.services) {
      for (const zone of service.zones) {
        renderByService = {
          ...renderByService,
          [zone.target]: {
            ...renderByService[zone.target],
            [zone.name]: {
              service: service.name,
              component: zone.component,
              order: zone.order,
              state: service.state
            }
          }
        };
      }
    }

    for (const service in renderByService) {
      const zoneValue = Object.values(renderByService[service]).sort((first, second) => first.order - second.order);
      const comp: ReactNode[] = [];
      const els = document.querySelector(service);

      for (const zone of zoneValue) {
        const clone = React.cloneElement(zone.component as ReactElement<any, string | JSXElementConstructor<any>>, {
          extensions: this.config.extensions,
          state: zone.state,
        })
        comp.push(clone);
      }

      this.renderer(comp as any as React.DOMElement<React.DOMAttributes<Element>, Element>, els);
    }
  }
}
