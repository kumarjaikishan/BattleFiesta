import { useEffect } from 'react';
import './channeldashboard.css'
import { useParams } from 'react-router-dom';

const Channeldashboard = () => {
  const { uid } = useParams();
  useEffect(() => {
    console.log(uid)
  }, [])

  return (
    <div className='channeldashboard'>

      <div className="profile">
        <div className="upperinfo">
          <div className="coverimage">
            <img src="https://firebasestorage.googleapis.com/v0/b/esportswebin.appspot.com/o/users%2FOyGza3wnnfT082g2YsrO1ag2umK2%2Fcover.webp?alt=media&token=10828b44-1acb-4a36-bdec-d7ac4e24a67d" alt="cover image" />
          </div>

          <div className="maininfo">
            <div className="top">
              <div className="profileimage">
                <img src="https://firebasestorage.googleapis.com/v0/b/esportswebin.appspot.com/o/users%2FOyGza3wnnfT082g2YsrO1ag2umK2%2Fphoto.webp?alt=media&token=18e2c5f4-0182-4ac8-ab5e-d7c25dc00835" alt="profile image" />
                <div className='names'>
                  <h2>Jai kishan</h2>
                  <span>@kishan</span>
                </div>
              </div>

              <div className="tournament infoo">
                <div>Tournament</div>
                <div>Private included</div>
                <div>8</div>
              </div>
              <div className="followers infoo">
                <div>Followers</div>
                <div>80</div>
              </div>
            </div>
            <div className="navbare">
               <span>profile</span>
               <span>tournaments</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Channeldashboard;
