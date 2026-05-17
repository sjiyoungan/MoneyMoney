import { cn } from '@/lib/utils'

type MoneyMoneyLogoProps = {
  className?: string
}

const LOGO_COLOR = '#3E5C45'

export function MoneyMoneyLogo({ className }: MoneyMoneyLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 32"
      fill="none"
      role="img"
      aria-label="MoneyMoney"
      className={cn('block h-6 w-auto shrink-0', className)}
    >
      <foreignObject x="0" y="0" width="180" height="32">
        <div
          className="font-logo text-[26px] leading-none tracking-[-0.02em] whitespace-nowrap"
          style={{
            color: LOGO_COLOR,
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          MoneyMoney
        </div>
      </foreignObject>
    </svg>
  )
}
