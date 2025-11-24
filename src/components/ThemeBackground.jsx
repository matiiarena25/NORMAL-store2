import useTheme from '../context/ThemeContext/useTheme';
import Balatro from './Balatro';

const ThemeBackground = () => {
    const { isDarkMode } = useTheme();

    if (!isDarkMode) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none'
        }}>
            <Balatro
                isRotate={false}
                mouseInteraction={true}
                pixelFilter={700}
                color1="#00D26A"
                color2="#FF69B4"
            />
        </div>
    );
};

export default ThemeBackground;
