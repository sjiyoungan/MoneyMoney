import { cn } from '@/lib/utils'

type MoneyMoneyLogoProps = {
  className?: string
}

export function MoneyMoneyLogo({ className }: MoneyMoneyLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 172 28"
      fill="none"
      role="img"
      aria-label="MoneyMoney"
      className={cn('block h-7 w-auto shrink-0', className)}
    >
      <text
        x="0"
        y="22"
        fill="#3E5C45"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="500"
        letterSpacing="-0.02em"
      >
        MoneyMoney
      </text>
    </svg>
  )
}
