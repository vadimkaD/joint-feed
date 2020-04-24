import React from "react";
import { UnitProps } from "./Unit.types";
import { UnitImage, UnitWrapper, HpBar, HpValue } from "./Unit.styled";

class Unit extends React.Component<UnitProps> {
    render() {
        const { image, hp, currentHp } = this.props;

        return (
            <UnitWrapper>
                <UnitImage image={image} />
                <HpBar>
                    <HpValue hp={hp} currentHp={currentHp}></HpValue>
                </HpBar>
            </UnitWrapper>
        );
    }
}

export default Unit;
export { Unit };
