
import { DataVisualization } from './DataAllRecord'

export const DrawingBoard = ({ token }) => {

    return (
        <div>
            <DataVisualization token={token} step={0} />
        </div>
    )
}