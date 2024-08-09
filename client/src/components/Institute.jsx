
import "./institute.css"

const Institute = ({ title, imageUrl }) => {
    return (
        <div className='institute_container'>
            <h1 className="title_institute">{title}</h1>
            <div className="content">
                <div className='banner_description'>
                    <p className="description">
                        {'GlobalCare Medical Institute is a premier institution dedicated to advancing healthcare education and innovation. We offer cutting-edge programs, state-of-the-art facilities, and a commitment to shaping the next generation of healthcare professionals. At GlobalCare, we prioritize excellence, compassion, and research-driven practices to equip our students with the skills and knowledge needed to excel in the medical field.'}
                    </p>
                </div>

                <div className='banner_img'>
                    <img src={imageUrl} alt="institute" className="img" />
                </div>
            </div>
        </div>
    )
}

export default Institute;