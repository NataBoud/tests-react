import { useState } from "react"

export default function ToggleMessage() {

    const [isVisible, setVisible] = useState(false);

    const handleToggle = () => {
        setVisible((prev) => !prev);
    }
    return (
        <div>
            <button onClick={handleToggle}>{isVisible ? 'Cacher' : 'Afficher'}</button>
            {isVisible && <p>Message affiché</p>}
        </div>
    )
}
