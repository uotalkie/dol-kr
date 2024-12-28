// @ts-check
/* globals MultiCanvasModel, Partial, CompositeLayerSpec */

class CombatEditor {
	static createCanvasCombatEditor() {
		const fragment = document.createDocumentFragment();

		const para = document.createElement("div");
		para.classList.add("d-flex", "flex-row", "p-1", "gap-1", "justify-content-end");
		para.append(
			CombatEditor.createButtonAsIcon("./img/ui/reload.png", "Reload - Use when animation breaks", () => {
				CombatEditor.recompileCombatCanvas();
			})
		);

		if (V.debug) {
			para.append(
				CombatEditor.createButtonAsIcon("./img/ui/refresh.png", "Refresh", () => {
					CombatEditor.refreshCombatCanvas();
				})
			);
		}
		fragment.append(para);

		return fragment;
	}

	/**
	 * @param {string} key
	 * @returns {DocumentFragment}
	 */
	static createLayerEditor(key) {
		const fragment = document.createDocumentFragment();

		const container = document.createElement("div");
		container.classList.add("d-grid", "grid-auto-3");
		const layers = CombatEditor.getModelLayers(key);
		const items = layers.map(function (layer) {
			const btn = document.createElement("button");
			btn.textContent = layer.name || "Unknown";
			if (layer.show !== true) {
				btn.classList.add("faded");
			}
			btn.addEventListener("click", ev => {
				CombatEditor.layer = layer;
				if (ev.shiftKey) {
					CombatEditor.layer.show = !CombatEditor.layer.show;
					if (CombatEditor.layer.show) {
						btn.classList.remove("faded");
					} else {
						btn.classList.add("faded");
					}
					CombatEditor.refreshCombatCanvas();
					return;
				}
				const dialog = document.getElementById("combatMainLayerDialog");
				if (dialog && dialog instanceof HTMLDialogElement) {
					dialog.replaceChildren(CombatEditor.createLayerDialogContent(btn));
					dialog.showModal();
				}
			});
			return btn;
		});
		items.forEach(item => container.append(item));
		fragment.append(container);

		return fragment;
	}

	/**
	 * @param {HTMLElement} parent
	 * @returns {DocumentFragment}
	 */
	static createLayerDialogContent(parent) {
		const fragment = document.createDocumentFragment();

		const layer = CombatEditor.layer;
		if (layer == null) {
			return fragment;
		}

		const container = document.createElement("div");
		container.classList.add("d-flex", "flex-column", "gap-1", "p-2");

		// Show
		CombatEditor.CreateCheckboxControl(container, "cr-layer-show", "Show: ", !!layer.show, (control, layer) => {
			layer.show = control.checked;
			if (layer.show) {
				parent.classList.remove("faded");
			} else {
				parent.classList.add("faded");
			}
		});

		// Src
		if (typeof layer.src === "string") {
			CombatEditor.CreateTextboxControl(container, "cr-layer-src", "Src: ", layer.src, (control, layer) => {
				layer.src = control.value;
			});
		}

		// X
		CombatEditor.CreateNumericControl(container, "cr-layer-x", "X: ", layer.dx, (control, layer) => {
			if (!Number.isFinite(control.valueAsNumber)) {
				control.value = layer.dx?.toString() || "0";
				return;
			}
			layer.dx = control.valueAsNumber;
		});

		// Y
		CombatEditor.CreateNumericControl(container, "cr-layer-y", "Y: ", layer.dy, (control, layer) => {
			if (!Number.isFinite(control.valueAsNumber)) {
				control.value = layer.dy?.toString() || "0";
				return;
			}
			layer.dy = control.valueAsNumber;
		});

		// Z
		CombatEditor.CreateNumericControl(container, "cr-layer-z", "Z: ", layer.z, (control, layer) => {
			if (!Number.isFinite(control.valueAsNumber)) {
				control.value = layer.z?.toString() || "0";
				return;
			}
			layer.z = control.valueAsNumber;
		});

		// Blend
		if (typeof layer.blend === "string") {
			CombatEditor.CreateTextboxControl(container, "cr-layer-blend", "Blend: ", layer.blend, (control, layer) => {
				layer.blend = control.value;
			});
		}

		// Blend mode
		if (typeof layer.blendMode === "string") {
			CombatEditor.CreateTextboxControl(container, "cr-layer-blendmode", "Blend mode: ", layer.blendMode, (control, layer) => {
				// @ts-ignore - Dev-User input
				layer.blendMode = control.value;
			});
		}

		// Alpha
		CombatEditor.CreateNumericControl(container, "cr-layer-alpha", "Alpha: ", layer.alpha, (control, layer) => {
			if (!Number.isFinite(control.valueAsNumber)) {
				control.value = layer.alpha?.toString() || "0";
				return;
			}
			layer.alpha = control.valueAsNumber;
		});

		// Filter list
		const filterSpan = document.createElement("span");
		// @ts-ignore
		filterSpan.textContent = "Filters: " + JSON.stringify(layer.filters);
		container.append(filterSpan);

		// Animation key
		if (typeof layer.animation === "string") {
			CombatEditor.CreateTextboxControl(container, "cr-layer-animation", "Animation*: ", layer.animation, (control, layer) => {
				layer.animation = control.value;
			});
		}

		// Mask src
		if (typeof layer.masksrc === "string") {
			CombatEditor.CreateTextboxControl(container, "cr-layer-masksrc", "Mask: ", layer.masksrc, (control, layer) => {
				layer.masksrc = control.value;
			});
		}

		if (Array.isArray(layer.masksrc)) {
			layer.masksrc.forEach((src, i) => {
				if (typeof src === "string") {
					CombatEditor.CreateTextboxControl(container, "cr-layer-masksrc" + i, "Mask: ", src, (control, layer) => {
						if (Array.isArray(layer.masksrc) && typeof layer.masksrc[i] === "string") {
							layer.masksrc[i] = control.value;
						}
					});
				}
			});
		}

		if (typeof layer.masksrc === "object") {
			if (!Array.isArray(layer.masksrc) && Renderer.isMaskObject(layer.masksrc)) {
				CombatEditor.CreateTextboxControl(container, "cr-layer-masksrc", "Mask: ", layer.masksrc.path, (control, layer) => {
					if (typeof layer.masksrc === "object" && !Array.isArray(layer.masksrc) && Renderer.isMaskObject(layer.masksrc)) {
						layer.masksrc.path = control.value;
					}
				});
			}
			if (Array.isArray(layer.masksrc)) {
				layer.masksrc.forEach((src, i) => {
					if (Renderer.isMaskObject(src)) {
						CombatEditor.CreateTextboxControl(container, "cr-layer-masksrc" + i, `Mask ${i}: `, src.path, (control, layer) => {
							if (typeof layer.masksrc === "object" && !Array.isArray(layer.masksrc) && Renderer.isMaskObject(layer.masksrc)) {
								layer.masksrc.path = control.value;
							}
						});
					}
				});
			}
		}

		fragment.append(container);
		return fragment;
	}

	/**
	 * @param {HTMLElement} parent
	 * @param {string} id
	 * @param {string?} summary
	 * @param {boolean} value
	 * @param {function(HTMLInputElement, Partial<CompositeLayerSpec>): void} onChange
	 */
	static CreateCheckboxControl(parent, id, summary, value, onChange) {
		const label = document.createElement("label");
		label.classList.add("d-flex");
		label.textContent = summary;
		label.htmlFor = id;

		const control = document.createElement("input");
		control.id = id;
		control.classList.add("mx-auto");
		control.type = "checkbox";
		control.checked = value;
		control.addEventListener("change", ev => {
			if (CombatEditor.layer == null) {
				return;
			}
			if (!(ev.target instanceof HTMLInputElement)) {
				return;
			}
			onChange(ev.target, CombatEditor.layer);
			CombatEditor.refreshCombatCanvas();
		});
		label.append(control);
		parent.append(label);
	}

	/**
	 * @param {HTMLElement} parent
	 * @param {string} id
	 * @param {string?} summary
	 * @param {string | null | undefined} value
	 * @param {function(HTMLInputElement, Partial<CompositeLayerSpec>): void} onChange
	 */
	static CreateTextboxControl(parent, id, summary, value, onChange) {
		const label = document.createElement("label");
		label.classList.add("d-flex", "justify-content-space-between");
		label.textContent = summary;
		label.htmlFor = id;

		const control = document.createElement("input");
		control.id = id;
		control.classList.add("bg-dark", "text-light", "white");
		control.type = "text";
		control.value = value?.toString() || "";
		control.onfocus = () => {
			V.tempDisable = true;
		};
		control.onblur = () => {
			V.tempDisable = false;
		};
		control.addEventListener("change", ev => {
			if (CombatEditor.layer == null) {
				return;
			}
			if (!(ev.target instanceof HTMLInputElement)) {
				return;
			}
			onChange(ev.target, CombatEditor.layer);
			CombatEditor.refreshCombatCanvas();
		});
		label.append(control);
		parent.append(label);
	}

	/**
	 * @param {HTMLElement} parent
	 * @param {string} id
	 * @param {string?} summary
	 * @param {number | undefined} value
	 * @param {function(HTMLInputElement, Partial<CompositeLayerSpec>): void} onChange
	 */
	static CreateNumericControl(parent, id, summary, value, onChange) {
		const label = document.createElement("label");
		label.classList.add("d-flex", "justify-content-space-between");
		label.textContent = summary;
		label.htmlFor = id;

		const control = document.createElement("input");
		control.id = id;
		control.classList.add("bg-dark", "text-light", "white");
		control.type = "number";
		control.value = value?.toString() || "0";
		control.onfocus = () => {
			V.tempDisable = true;
		};
		control.onblur = () => {
			V.tempDisable = false;
		};
		control.addEventListener("change", ev => {
			if (CombatEditor.layer == null) {
				return;
			}
			if (!(ev.target instanceof HTMLInputElement)) {
				return;
			}
			onChange(ev.target, CombatEditor.layer);
			CombatEditor.refreshCombatCanvas();
		});
		label.append(control);
		parent.append(label);
	}

	static createLayerDialog() {
		return CombatEditor.createDialog("combatMainLayerDialog", null);
	}

	/**
	 * @param {string} id
	 * @param {DocumentFragment?} content
	 * @returns {DocumentFragment}
	 */
	static createDialog(id, content) {
		const fragment = document.createDocumentFragment();
		const dialog = document.createElement("dialog");
		dialog.id = id;
		dialog.classList.add("p-0");
		dialog.addEventListener("click", ev => {
			if (ev.target !== dialog) {
				return;
			}
			dialog.close();
		});
		if (content) {
			dialog.append(content);
		}
		fragment.append(dialog);
		return fragment;
	}

	/**
	 * @param {string} src
	 * @param {string} title
	 * @param {function():void} callback
	 */
	static createButtonAsIcon(src, title, callback) {
		const button = document.createElement("button");
		button.classList.add("btn", "btn-info", "btn-icon");
		button.title = title;
		const icon = document.createElement("img");
		icon.src = src;
		button.append(icon);
		button.addEventListener("click", function () {
			callback();
		});
		return button;
	}

	/**
	 * @param {string} text
	 * @param {function():void} callback
	 */
	static createButton(text, callback) {
		const button = document.createElement("button");
		button.classList.add("btn", "btn-info");
		button.textContent = text;
		button.addEventListener("click", function () {
			callback();
		});
		return button;
	}

	static refreshCombatCanvas() {
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels.combatMain;
		if (model != null) {
			model.refreshAnimation();
		}
	}

	static recompileCombatCanvas() {
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels.combatMain;
		if (model != null) {
			model.refresh();
		}
	}

	/**
	 * @param {string} key
	 * @returns {CompositeLayerSpec[]}
	 */
	static getModelLayers(key) {
		const model = T.multiCombatModels[key];
		return model.layers || [];
	}
}
CombatEditor.layersChecked = false;
window.CombatEditor = CombatEditor;

/** @type {Partial<CompositeLayerSpec>?} */
CombatEditor.layer = null;

Macro.add("canvasCombatEditor", {
	handler() {
		const fragment = CombatEditor.createCanvasCombatEditor();
		this.output.append(fragment);
	},
});

Macro.add("addLayerElements", {
	handler() {
		const fragment = CombatEditor.createLayerEditor("combatMain");
		this.output.append(fragment);
	},
});

Macro.add("addLayerDialog", {
	handler() {
		const fragment = CombatEditor.createLayerDialog();
		this.output.append(fragment);
	},
});

Macro.add("bindCombatDebugControls", {
	handler() {
		const passages = document.getElementById("passages");
		passages?.addEventListener("change", ev => {
			if (ev.target instanceof HTMLInputElement && ev.target.name === "layers") {
				const containers = document.getElementsByClassName("combat-layers");
				for (const element of containers) {
					CombatEditor.layersChecked = ev.target.checked;
					if (CombatEditor.layersChecked) {
						element.classList.add("show-first");
						continue;
					}
					element.classList.remove("show-first");
				}
			}
		});
	},
});
