import React, {forwardRef} from 'react';
import {Card} from '@/components/ui/card'
export const Item = forwardRef(({children,drag,activeId, ...props}, ref) => {
  return (
    <Card className={"p-2 h-24 my-2 text-center py-8 w-24 "+((drag&&(activeId!=null))?'bg-slate-800':'')} ref={ref} {...props}>{children}</Card>
  )
});
