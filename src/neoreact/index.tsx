import {
  NeoReact as INeoReact,
  Configuration,
  Service,
  NeoExtension,
  ComponentType,
  RenderService
} from "./src/core";
import React from "react";

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

  add(service: Service<T>) {}

  create() {}

  public render() {
    let component;
    if (typeof this.config.component === "function") {
      component = this.config.component({});
    } else {
      component = this.config.component;
    }
    this.renderer(component, document.querySelector(this.config.target));

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
              order: zone.order
            }
          }
        };
      }
    }

    Object.keys(renderByService).forEach(serviceName => {
      const zoneValue = Object.values(renderByService[serviceName]);
      let comp: JSX.Element[] = [];
      const els = document.querySelector(serviceName);
      zoneValue.forEach((zone, index) => {
        if (typeof zone.component === "function") {
          comp.push(zone.component({}));
        } else {
          comp.push(zone.component);
        }
      });
      this.renderer(<React.Fragment>{comp}</React.Fragment>, els);
    });
    console.log(renderByService);
  }
}
