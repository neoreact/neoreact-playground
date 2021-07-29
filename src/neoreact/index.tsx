import {
  NeoReact as INeoReact,
  Configuration,
  Service,
  NeoExtension,
  ComponentType,
  RenderService,
  NeoReactComponentProps
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

  /** TODO */
  public add = undefined;
  public create = undefined;

  public render() {
    let component: JSX.Element;
    if (typeof this.config.component === "function") {
      component = this.config.component({ extensions: this.extension}) as React.ReactElement<NeoReactComponentProps>;
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

    for (const service in renderByService) {
      const zoneValue = Object.values(renderByService[service]);
      let comp: JSX.Element[] = [];
      const els = document.querySelector(service);
      for (const zone of zoneValue) {
        console.log(zone.component)
        if (typeof zone.component === "function") {
          comp.push(zone.component({ extensions: this.extension }) as React.ReactElement<NeoReactComponentProps>);
        } else {
          zone.component.props = { ...zone.component.props, extensions: this.extension };
          comp.push(zone.component);
        }
      }
      this.renderer(comp, els);
    }
  }
}
