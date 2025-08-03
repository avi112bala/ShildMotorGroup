const CustomButton = ({
    title,
    className,
    onClick,
    loading,
  }) => {
    return (
      <button
        disabled={loading}
        type="submit"
        onClick={onClick}
        className={`text-white font-bold rounded-3xl  hover:bg-[#8f25f8a1] px-4 py-2 ${className}`}
        style={{backgroundColor:`var(--button_background)`}}
     >
        {/* bg-purple-600 */}
        {title}
      </button>
    );
  };
  
  export default CustomButton;
  