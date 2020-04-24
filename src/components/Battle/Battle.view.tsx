import React from "react";
import { BattleViewProps, Unit as StateUnit } from "./Battle.types";
import { BattleViewWrapper, CenterWrapper, Hex, LineContainer } from "./Battle.styled";
import Unit from "../Unit";
import Units from "../../core/units";

class BattleView extends React.Component<BattleViewProps> {
    widthArray: number[];
    heightArray: number[];

    constructor(props: BattleViewProps) {
        super(props);
        const { width, height } = props;
        this.widthArray = new Array(width).fill(1).map((v, i) => i);
        this.heightArray = new Array(height).fill(1).map((v, i) => i);
    }

    onHexClick = (x: number, y: number) => (e: React.SyntheticEvent) => {
        const { onHexClick } = this.props;
        onHexClick(x, y);
    };

    renderLine(lineNumber: number): React.ReactElement {
        const { width, units } = this.props;

        return (
            <LineContainer width={width} notFirst={lineNumber !== 0} key={lineNumber}>
                {this.widthArray.map(i => {
                    let renderUnit;
                    try {
                        const unit = units.find(unit => unit.y === lineNumber && unit.x === i) as StateUnit;
                        const currentUnit = Units[unit.id];
                        renderUnit = <Unit currentHp={unit.currentHp} hp={currentUnit.hp} image={currentUnit.image} />;
                    } catch (e) {}

                    return (
                        <Hex onClick={this.onHexClick(i, lineNumber)} key={i}>
                            &nbsp;{renderUnit}
                        </Hex>
                    );
                })}
            </LineContainer>
        );
    }

    render() {
        return (
            <CenterWrapper>
                <BattleViewWrapper width={this.props.width}>
                    {this.heightArray.map(i => this.renderLine(i))}
                </BattleViewWrapper>
            </CenterWrapper>
        );
    }
}

export default BattleView;
export { BattleView };
