import React from "react";

function CustomRadio(props) {
    const { icon, isSelected, onClick } = props;

    return (
        <button className={isSelected ? "selected_type shadow[0_15px_30px_-2px_rgba(0, 0, 0, 0.04)]" : "select_type"}
                onClick={onClick}
        >
            <img src={`${icon}`} alt="테스트" />
        </button>
    );
}

CustomRadio.defaultProps = {
    icon: '',
    key: '',
    isSelected: false,
    onClick: () => {},
    index: 0
}

export default CustomRadio;