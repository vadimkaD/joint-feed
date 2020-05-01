import React from "react";
import { BattleViewProps, PreparedUnit, Hex as HexType } from "./Battle.types";
import { BattleViewWrapper, CenterWrapper, Hex, LabelWrap, LineContainer, EmptyHex } from "./Battle.styled";
import Unit from "../Unit";
import InfoPanel from "../Unit/InfoPanel/InfoPanel";

class BattleView extends React.Component<BattleViewProps> {
    widthArray: number[];
    heightArray: number[];

    constructor(props: BattleViewProps) {
        super(props);
        const { width, height } = props;
        this.widthArray = new Array(width).fill(1).map((v, i) => i);
        this.heightArray = new Array(height).fill(1).map((v, i) => i);
    }

    onHexClick = (hex: HexType) => (e: React.SyntheticEvent) => {
        const { onHexClick } = this.props;
        onHexClick(hex);
    };

    onMouseEnterHex = (hex: HexType) => (e: React.SyntheticEvent) => {
        const { onMouseEnterHex } = this.props;
        onMouseEnterHex(hex);
    };

    renderLine(lineNumber: number): React.ReactElement {
        const { width, preparedUnits, hexes } = this.props;

        return (
            <LineContainer width={width} lineNumber={lineNumber} key={lineNumber}>
                {this.widthArray.map(i => {
                    const hex: HexType = hexes[`${i}:${lineNumber}`];

                    let renderUnit;
                    try {
                        const unit = preparedUnits.find(unit => unit.y === lineNumber && unit.x === i) as PreparedUnit;
                        if (!unit) throw new Error("unit not found in this hex");
                        renderUnit = <Unit unit={unit} />;
                    } catch (e) {}

                    if (hex.isEmpty) return <EmptyHex key={i}>&nbsp;</EmptyHex>;

                    return (
                        <Hex
                            onMouseEnter={this.onMouseEnterHex(hex)}
                            onClick={this.onHexClick(hex)}
                            isHighlighted={hex.isHighlighted}
                            key={i}
                        >
                            <LabelWrap>
                                {i}:{lineNumber}
                            </LabelWrap>
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
                <InfoPanel />
            </CenterWrapper>
        );
    }
}

export default BattleView;
export { BattleView };
