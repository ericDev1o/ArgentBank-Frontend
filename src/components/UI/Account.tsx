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
    return <article className='account'>
        <div className='account-content-wrapper'>
            <h3 className='account-title'>Argent Bank {title}</h3>
            <p className='account-amount'>{currency}{amount}</p>
            <p className='account-amount-description'>{description} Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
            <button className='transaction-button'>View transactions</button>
        </div>
    </article>
}