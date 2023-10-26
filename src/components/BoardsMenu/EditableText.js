import { useState } from "react";


const EditableText = ({ className, trueState, onCommit, isEditMode=false }) => {
    const [inputState, setInputState] = useState(trueState);

    const classNames = className+" editable-text";
    
    if(isEditMode){
        return (
            <input
                className={ classNames }
                autoFocus
          
                value={ inputState }
                onChange={(e) => setInputState(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        onCommit(inputState);
                    }
                }}
            />
        );
    }
    if(!isEditMode){
        return(
            <div className={ classNames }>{ trueState }</div>
        );
    }
}


export default EditableText;