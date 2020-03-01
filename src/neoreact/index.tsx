import { NeoReact as INeoReact, Configuration, Service, NeoExtension } from './src/core';

export class NeoReact<T> implements INeoReact<T> {

	private extension: NeoExtension = {};

	constructor(private config: Configuration<T>, private renderer: ReactDOM.Renderer) {
		for (const key in this.config.extensions) {
			const extension = this.config.extensions[key];
			extension.func(this.extension);
		}
	}

	add(service: Service<T>) { }

	create() { }

	public render() {
		let component;
		if (typeof this.config.component === 'function') {
			component = this.config.component({});
		} else {
			component = this.config.component;
		}
		this.renderer(component, document.querySelector(this.config.to));

		for (const service of this.config.services) {
			for (const zone of service.zones) {
				const els = document.querySelectorAll(zone.target);

				if ((els == null || els.length === 0) && this.config.debug) {
					if (service.required) {
						throw new Error(`Cannot render zone "${zone.name}" in required service "${service.name}", exiting.`);
					} else {
						console.error(`Cannot render zone "${zone.name}" in service "${service.name}"`);
					}

					return;
				}

				els.forEach(el => {
					try {
						let comp: JSX.Element;

						if (typeof zone.component === 'function') {
							comp = zone.component({});
						} else {
							comp = zone.component;
						}

						this.renderer(comp, el)
					} catch (err) {
						if (this.config.debug) {
							if (service.required) {
								throw new Error('Cannot render zone in required service, exiting.');
							} else {
								console.error(`Cannot render ${zone.name} in service ${service.name}`);
								console.error(err);
							}
						}
					}
				});
			}
		}
	}

}