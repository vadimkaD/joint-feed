import React from "react";
import { UnitProps } from "./Unit.types";
import { UnitImage, UnitWrapper, HpBar, HpValue } from "./Unit.styled";

class Unit extends React.Component<UnitProps> {
    render() {
        const {
            unit: { image, currentHp, maxHp },
        } = this.props;

        return (
            <UnitWrapper>
                <UnitImage image={image} />
                <HpBar>
                    <HpValue maxHp={maxHp} currentHp={currentHp}></HpValue>
                </HpBar>
            </UnitWrapper>
        );
    }
}

export default Unit;
export { Unit };
