import { useEffect, createElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import clipboardsSlice from "../../redux/clipboardsSlice";
import toastsSlice from "../../redux/toastsSlice";
import "./Clipboards.scss";

function Clipboards() {
    const dispatch = useDispatch();
    const clipboards = useSelector((state) => state.clipboards.clipboards);
    const toasts = useSelector((state) => state.toasts.toasts);

    const copy = useCallback((index, text) => {
        navigator.clipboard.writeText(text).then(() => {
            const id = Date.now();
            dispatch(toastsSlice.actions.addToast({
                id,
                elem: createElement('div', { className: "copy-alert" }, `Copied text from clipboard ${index + 1} successfully!`)
            }));
            setTimeout(() => {
                dispatch(toastsSlice.actions.removeToast(id));
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }, [dispatch]);

    const handleKeyDown = useCallback((event) => {
        if (event.ctrlKey) {
            if (/^[0-9]$/.test(event.key)) {
                event.preventDefault();
                let index = parseInt(event.key) ? parseInt(event.key)-1 : 9;
                copy(index, clipboards[index]);
            }
        }
    }, [clipboards, copy]);

    useEffect(() => {
        document.title = "Clipboards";
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const addClipboard = () => {
        if(clipboards.length >= 10) {
            console.log("You can only have a maximum 10 clipboards.");
            return;
        }
        dispatch(clipboardsSlice.actions.addClipboard());
    };

    const removeClipboard = (index) => {
        if(clipboards.length <= 1) {
            console.log("You need to have at least 1 clipboard.");
            return;
        }
        dispatch(clipboardsSlice.actions.removeClipboard(index));
    }

    const updateText = (text, index) => {
        dispatch(clipboardsSlice.actions.updateClipboardText({ index, text }));
    }

    return (
        <div className='full-screen'>
            <div className="header">Your clipboards</div>
            <button type="button" onClick={addClipboard} disabled={clipboards.length >= 10} title="A maximum of 10 clipboards are allowed">Add Clipboard</button>
            {clipboards.map((clipboard, index) => (
                <div key={index} className="clipboard-row">
                    <textarea value={clipboard} rows={6} onInput={(e) => {updateText(e.target.value,index)}} spellCheck={false}></textarea>
                    <div className="actions-container">
                        <div className="ways-to-copy">
                            <button type="button" onClick={() => copy(index, clipboard)}>Copy To Clipboard</button>
                            <div>&nbsp;&nbsp;( or, you can also hit Ctrl+{index===9 ? 0 : index+1} to copy the text above! )</div>
                        </div>
                        {clipboards.length>1 ? <button type="button" onClick={() => removeClipboard(index)}>Delete Clipboard</button> : <></>}
                    </div>
                </div>
            ))}
            <div className="copy-alerts-container">
                {toasts.map((toast) => (
                    toast.elem
                ))}
            </div>
        </div>
    );
}

export default Clipboards;
