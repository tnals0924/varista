import React from "react";

function CustomRadio(props) {
    const { icon, isSelected, onClick } = props;

    return (
        <button className={isSelected ? "selected_type transition-all" : "select_type transition-all"}
                onClick={onClick}
        >
            <img src={`${icon}`} alt="테스트" />
        </button>
    );
}

CustomRadio.defaultProps = {
    icon: '',
    isSelected: false,
    onClick: () => {},
    index: 0
}

export default CustomRadio;