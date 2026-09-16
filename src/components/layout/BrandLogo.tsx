interface BrandLogoProps { placement?: 'header' | 'login' }

export default function BrandLogo({ placement = 'header' }: BrandLogoProps) {
  return <img
    className={`brand-logo brand-logo--${placement}`}
    src={`${import.meta.env.BASE_URL}praegler-logo-green.png`}
    alt="Prägler — Surface Engineering of Metals"
  />
}
