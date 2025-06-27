import React from 'react'

const BlogCard = ({blog}) => {

    const{title, description, category, image, _id} = blog;
    const navigate = useNavigate()
  return (
    <div>
        <img src={image} alt="card" className='aspect-video' />
        <span
        className='ml-5 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>
            {category}</span>
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
                <p className='mb-3 text-xs text-gray-600'>{description.slice(0,80)}</p>
            </div>
        </div>
  )
}

export default BlogCard