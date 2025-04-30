import { useState, useEffect, createElement } from "react";

import "./Clipboards.scss";

function Clipboards() {
    useEffect(() => {
        document.title = "Clipboards";
        const handleKeyDown = (event) => {
            if (event.ctrlKey) {
                if (/^[0-9]$/.test(event.key)) {
                    event.preventDefault();
                    let index = parseInt(event.key) ? parseInt(event.key)-1 : 9;
                    setClipboards((prevClipboards) => {
                        console.log(event.key,prevClipboards);
                        if (index < prevClipboards.length) {
                            copy(index, prevClipboards[index]);
                        }
                        return prevClipboards;
                    });
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [clipboards, setClipboards] = useState([""]);
    const [toasts, setToasts] = useState([]);

    const addClipboard = () => {
        if(clipboards.length >= 10) {
            console.log("You can only have a maximum 10 clipboards.");
            return;
        }
        setClipboards([...clipboards, ""]);
    };

    const removeClipboard = (index) => {
        if(clipboards.length <= 1) {
            console.log("You need to have at least 1 clipboard.");
            return;
        }
        const newClipboards = [...clipboards];
        newClipboards.splice(index, 1);
        setClipboards(newClipboards);
    }

    const updateText = (text, index) => {
        const newClipboards = [...clipboards];
        newClipboards[index] = text;
        setClipboards(newClipboards);
    }

    const copy = (index, text) => {
        navigator.clipboard.writeText(text).then(() => {
            setToasts((prevToasts) => {
                const createdAt = Date.now();
                const toastObj = {
                    id: createdAt,
                    elem: createElement('div',{className:"copy-alert"},`Copied text from clipboard ${index+1} successfully!`)
                }
                setTimeout(() => {
                    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== createdAt));
                }, 3000);
                return [...prevToasts, toastObj];
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
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
