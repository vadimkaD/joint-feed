import React from "react";
import { BattleViewProps, PreparedUnit, Hex as HexType } from "./Battle.types";
import { BattleViewWrapper, CenterWrapper, Hex, LabelWrap, LineContainer, EmptyHex } from "./Battle.styled";
import Unit from "../Unit";
import InfoPanel from "../Unit/InfoPanel/InfoPanel";
import { getStringFromCoord } from "./Battle.utils";

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
        const { width, hexes, unitsOnBoard, highlightedHexes } = this.props;

        return (
            <LineContainer width={width} lineNumber={lineNumber} key={lineNumber}>
                {this.widthArray.map(i => {
                    const hex: HexType = hexes[getStringFromCoord({ x: i, y: lineNumber })];

                    let renderUnit;
                    const unit = unitsOnBoard[getStringFromCoord(hex.coord)];
                    if (unit) {
                        renderUnit = <Unit unit={unit} />;
                    }

                    if (hex.isEmpty) return <EmptyHex key={i}>&nbsp;</EmptyHex>;

                    return (
                        <Hex
                            onMouseEnter={this.onMouseEnterHex(hex)}
                            onClick={this.onHexClick(hex)}
                            isHighlighted={!!highlightedHexes[getStringFromCoord(hex.coord)]}
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
