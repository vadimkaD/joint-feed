import React from "react";
import { BattleProps } from "./Battle.types";
import { Hex, LineContainer } from "./Battle.styled";

class Battle extends React.Component<BattleProps> {
    widthArray: number[];
    heightArray: number[];

    constructor(props: BattleProps) {
        super(props);
        const { width, height } = props;
        this.widthArray = new Array(width).fill(1).map((v, i) => i);
        this.heightArray = new Array(height).fill(1).map((v, i) => i);
    }

    renderLine(lineNumber: number): React.ReactElement {
        const { width } = this.props;

        return (
            <LineContainer width={width} notFirst={lineNumber !== 0} key={lineNumber}>
                {this.widthArray.map(i => {
                    return (
                        <Hex key={i}>
                            {lineNumber}:{i}
                        </Hex>
                    );
                })}
            </LineContainer>
        );
    }

    render() {
        return <>{this.heightArray.map(i => this.renderLine(i))}</>;
    }
}

export default Battle;
export { Battle };
