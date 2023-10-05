import "./css/MasonryGrid.css";

const createMatrix = (componentsArr, numCols) => {
    const matrix = [];
    for(let i = 0; i < componentsArr.length; i += numCols){
        let row = [];
        for(let j = 0; j < numCols; j++){ row.push(componentsArr[i+j]); }
    
        matrix.push(row);
        row = [];
    }
    return matrix;
}
const createMasonryMatrix = (matrix) => matrix[0].map((_, colIdx) => matrix.map(row => row[colIdx]));
const clean2DMatrix = (matrix) => matrix.map(row => row.filter(item => item!==undefined));


const MasonryGrid = ({ children, numCols, colGap, rowGap, className }) => {
    const masonry = clean2DMatrix(createMasonryMatrix(createMatrix(children, numCols)));

    return (
        <div className={ "masonry-grid "+ className } style={{gap:colGap}}>
            { 
                masonry.map(col => (
                    <div className="masonry-col" style={{gap:rowGap}}>
                        { col.map(component => component) }
                    </div>
                ))
            }
        </div>
    );
};


export default MasonryGrid;