export default function Account(
    {
        title,
        currency,
        amount,
        description
    } : {
        title: string,
        currency: string,
        amount: string,
        description: string
    }
) {
    return <article className='
        account 
        display-flex
        flex-direction-column 
        justify-content-space-between 
        align-items-center 
        text-align-left
        margin-0-auto 
        margin-bottom-2rem 
        box-sizing-border-box'
    >
        <div 
            className='
                account-content-wrapper 
                flex-1 
                width-100percent'
        >
            <h3 className='
                account-title 
                padding-0 
                margin-0 
                font-size-1rem'
            >Argent Bank {title}</h3>
            <p className='account-amount margin-0 font-weight-bold'>{currency}{amount}</p>
            <p className='margin-0'>{description} Balance</p>
        </div>
        <div 
            className='
                account-content-wrapper 
                flex-1  
                width-100percent 
                cta'
        >
            <button 
                className='
                    button 
                    transaction-button 
                    font-weight-bold 
                    width-100percent 
                    margin-top-1rem 
                    padding-8px 
                    font-size-1dot1rem'
            >
                View transactions
            </button>
        </div>
    </article>
}