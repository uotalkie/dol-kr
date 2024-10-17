/* eslint-disable no-undef */
Macro.add("numberslider", {
	handler() {
		const stepValidate = value => Math.round((value - minValue) / stepValue) * stepValue + minValue;

		function validateAndApply(el) {
			const curValue = Wikifier.getValue(varName);
			let newValue = Number(el.value);

			if (!Number.isFinite(newValue)) {
				el.value = curValue;
				return false;
			}

			newValue = stepValidate(newValue);
			newValue = Math.max(minValue, Math.min(maxValue, newValue));

			if (pool) {
				const poolValue = pool.get();
				let delta = newValue - curValue;
				if (poolValue < delta) {
					newValue -= delta - poolValue;
					delta = newValue - curValue;
				}
				pool.set(poolValue - delta);
			}

			Wikifier.setValue(varName, newValue);
			el.value = newValue;

			return true;
		}

		if (this.args.length < 5) {
			const errors = [];
			return (
				this.args.length < 1 && errors.push("variable name"),
				this.args.length < 2 && errors.push("default value"),
				this.args.length < 3 && errors.push("min value"),
				this.args.length < 4 && errors.push("max value"),
				this.args.length < 5 && errors.push("step value"),
				this.error("no " + errors.join(" or ") + " specified")
			);
		}

		const varName = this.args[0].trim();
		if (varName[0] !== "$" && varName[0] !== "_") {
			return this.error(`variable name "${this.args[0]}" is missing its sigil ($ or _)`);
		}

		const varId = Util.slugify(varName);
		const defValue = Number(this.args[1]);
		const minValue = Number(this.args[2]);
		const maxValue = Number(this.args[3]);
		const stepValue = Number(this.args[4]);
		const callbacks = typeof this.args[5] === "object" ? this.args[5] : {};
		const autofocus = this.args[6] === "autofocus";

		if (!Number.isFinite(defValue)) return this.error(`default value (${this.args[1]}) is not a number`);
		if (!Number.isFinite(minValue)) return this.error(`min value (${this.args[2]}) is not a number`);
		if (!Number.isFinite(maxValue)) return this.error(`max value (${this.args[3]}) is not a number`);
		if (!Number.isFinite(stepValue) || stepValue <= 0) return this.error(`step value (${this.args[4]}) is not a number greater than zero`);
		if (defValue < minValue) return this.error(`default value (${this.args[1]}) is less than min value (${this.args[2]})`);
		if (defValue > maxValue) return this.error(`default value (${this.args[1]}) is greater than max value (${this.args[3]})`);

		const pool = function () {
			const parent = this.contextSelect(ctx => ctx.name === "numberpool");
			return parent && Object.hasOwn(parent, "pool") ? parent.pool : null;
		}.call(this);

		const $elControl = $("<div>").attr("id", `${this.name}-body-${varId}`).addClass(`macro-${this.name}`).appendTo(this.output);
		const $elInput = $("<input>")
			.attr({
				id: `${this.name}-input-${varId}`,
				name: `${this.name}-input-${varId}`,
				type: "range",
				min: minValue,
				max: maxValue,
				step: stepValue,
				tabindex: 0,
				disabled: this.args[6] !== undefined ? this.args[6] : false,
			})
			.on("change input." + Util.slugify(this.name), function () {
				validateAndApply(this);
				showValue();
				if (callbacks.onInputChange) {
					throttledInput();
				}
			})
			.on("mouseup touchend keyup", function () {
				if (callbacks.onMouseUp) {
					callbacks.onMouseUp(Number($elInput.val()));
				}
			})
			.on("keypress", function (ev) {
				if (ev.which === 13) {
					ev.preventDefault();
					$elInput.trigger("change");
				}
			})
			.appendTo($elControl);

		const $elValue = $("<span>").attr("id", `${this.name}-value-${varId}`).appendTo($elControl);

		const showValue = () => {
			$elValue.html(callbacks.value ? callbacks.value(Number($elInput.val())) : Number($elInput.val()));
		};

		$elInput.val(defValue);
		validateAndApply($elInput[0]);
		showValue();

		if (autofocus) {
			$elInput.attr("autofocus", "autofocus");
			postdisplay[`#autofocus:${$elInput.attr("id")}`] = function (task) {
				delete postdisplay[task];
				setTimeout(() => $elInput.trigger("focus"), Engine.minDomActionDelay);
			};
		}

		const throttledInput = $.throttle(200, () => {
			callbacks.onInputChange(Number($elInput.val()));
		});
	},
});
