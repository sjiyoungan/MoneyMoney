import { cn } from '@/lib/utils'

type MoneyMoneyLogoProps = {
  className?: string
}

export function MoneyMoneyLogo({ className }: MoneyMoneyLogoProps) {
  return (
    <span
      role="img"
      aria-label="MoneyMoney"
      className={cn(
        'font-logo inline-flex h-8 items-center text-[26px] leading-none tracking-[-0.02em] text-[#3E5C45]',
        className,
      )}
    >
      MoneyMoney
    </span>
  )
}
