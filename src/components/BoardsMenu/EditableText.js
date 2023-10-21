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
            <span className={ classNames }>{ trueState }</span>
        );
    }
}


export default EditableText;