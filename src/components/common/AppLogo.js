import { useSelector } from 'react-redux';
import whiteLogoImg from '../../assets/brands/logo.png'

export default function AppLogo() {
    const currentThemeValue = useSelector((state) => state.currentTheme.value);
    return (
        <img src={whiteLogoImg} alt=""  className="h-12" />
    )
}