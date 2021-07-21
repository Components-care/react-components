import React from "react";
import Type from "../Type";
import { ModelRenderParams } from "../index";
import FilterType from "../FilterType";
export interface EnumValue {
    value: string;
    getLabel: () => string;
    invisible?: boolean;
}
declare abstract class TypeEnum implements Type<string> {
    protected values: EnumValue[];
    constructor(values: EnumValue[]);
    abstract render(params: ModelRenderParams<string>): React.ReactElement;
    validate(value: string): string | null;
    getFilterType(): FilterType;
    getDefaultValue(): string;
    stringify(value: string): string;
    deserialize: (value: unknown) => string;
    serialize: (value: string) => string | null;
}
export default TypeEnum;
