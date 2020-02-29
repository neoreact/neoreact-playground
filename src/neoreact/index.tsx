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
		this.renderer(this.config.component, document.querySelector(this.config.to));

		for (const service of this.config.services) {
			for (const zone of service.zones) {
				const els = document.querySelectorAll(zone.target);

				console.log(els);

				if ((els == null || els.length === 0) && this.config.debug) {
					if (service.required) {
						throw new Error('Cannot render zone in required service, exiting.');
					} else {
						console.error(`Cannot render ${zone.name} in service ${service.name}`);
					}

					return;
				}

				els.forEach(el => {
					try {
						this.renderer(zone.component, el)
					} catch (err) {
						if (this.config.debug) {
							if (service.required) {
								throw new Error('Cannot render zone in required service, exiting.');
							} else {
								console.error(`Cannot render ${zone.name} in service ${service.name}`);
							}
						}
					}
				});
			}
		}
	}

}