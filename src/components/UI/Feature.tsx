export default function Feature(
    {
        imgSrc, 
        iconType,
        title,
        paragraph
    }: {
            imgSrc: string, 
            iconType: string,
            title: string,
            paragraph: string
        }
) {
    return <article className='feature-item flex-1'>
        <img 
        src={imgSrc} 
        alt={iconType}
        className='feature-icon'
        width='100px'
        height='100px'
        loading='lazy'
        />
        <h3 className='feature-item-title font-weight-bold'>{title}</h3>
        <p>{paragraph}</p>
    </article>
}