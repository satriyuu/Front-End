import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import profileImage from './assets/profile.jpeg';
import pythonLogo from './assets/python-logo.png';
import javascriptLogo from './assets/javascript-logo.png';
import htmlLogo from './assets/html-logo.png';
import cssLogo from './assets/css-logo.png';
import vuejsLogo from './assets/vuejs-logo.png';
import javaLogo from './assets/java-logo.png';
import dkImage from './assets/dk.jpg';
import alazharImage from './assets/alazhar.jpg';
import smk4Image from './assets/smk4.jpg';
import githubLogo from './assets/github-logo.png';
import instagramLogo from './assets/instagram.png';
import waLogo from './assets/wa.png';

const TypewriterText: React.FC = () => {
  return (
    <TypeAnimation
      sequence={[
        "Satriya!",
        3000,
        "a Front End Developer.",
        3000,
        "",
        500,
      ]}
      wrapper="span"
      speed={100}
      repeat={Infinity}
      style={{ color: '#8A2BE2' }}
    />
  );
};

const AnimatedComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`transition-transform duration-700 ease-in-out ${
        inView ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-full'
      }`}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: '', job: '', umur: '', id: null });
  const experienceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-pengunjung');
      console.log(response); // Tambahkan log ini
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.post('http://localhost:3000/update-pengunjung', form);
      } else {
        await axios.post('http://localhost:3000/store-pengunjung', form);
      }
      fetchData();
      setForm({ name: '', job: '', umur: '', id: null });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (item: any) => {
    setForm({ name: item.Nama, job: item.Job, umur: item.Umur, id: item.id });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.post('http://localhost:3000/delete-pengunjung', { id });
      fetchData();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const scrollToExperience = () => {
    experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">

      <div className="navbar bg-gray-950 rounded flex justify-between items-center px-20 fixed top-0 left-0 right-0 z-20 py-5">
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl text-white hover:text-purple-500">
            Satriya<span className="text-purple-500">.</span>
          </a>
        </div>
        <div className="flex-none flex space-x-4">
          <button onClick={scrollToExperience} className="btn btn-ghost text-xl text-white hover:text-purple-500">
            Experience
          </button>
          <a href="https://api.whatsapp.com/send/?phone=081214136623&text&type=phone_number&app_absent=0" className="btn bg-purple-700 text-lg text-white hover:bg-purple-700">
            Contact
          </a>
        </div>
      </div>

      <div style={{ height: '5rem' }}></div>


      <div className="flex justify-center items-center mt-20 px-20">
        <div className="card card-side bg-white bg-opacity-5 rounded-2xl p-8 flex items-center w-full justify-between shadow-blue">
          <div className="text-container text-left pr-8">
            <h1 className="text-5xl font-bold mb-4">
              Hello, I'm <TypewriterText text="Satriya!" />
            </h1>
            <p className="text-2xl mb-4">
              I'm a Front End developer with 2 years of experience using Python, JavaScript, Java, HTML, CSS and VueJS. Reach out if you'd like to learn more!
            </p>
            <br></br>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/satriyuu" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" className="w-12 h-12 hover:scale-110 transition-transform duration-300 ease-in-out" />
              </a>
              <a href="https://instagram.com/satriamlydi" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" className="w-12 h-12 hover:scale-110 transition-transform duration-300 ease-in-out" />
              </a>
              <a href="https://wa.me/081214136623" target="_blank" rel="noopener noreferrer">
                <img src={waLogo} alt="WhatsApp" className="w-12 h-12 hover:scale-110 transition-transform duration-300 ease-in-out" />
              </a>
            </div>
          </div>
          <div className="avatar-container">
            <div className="w-80 h-80 rounded-full overflow-hidden avatar">
              <img className="w-full h-full object-cover" src={profileImage} alt="Avatar" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '20vh' }}></div>


      <div ref={experienceRef} className="mt-40 px-40">
        <h2 className="text-5xl font-bold mb-6 text-center">Experience</h2>
        <br></br>
        <div className="flex justify-between items-start space-x-8 mb-12">
          

          <div className="flex flex-col items-center mb-8">
            <AnimatedComponent>
              <div className="relative">
                <img src={pythonLogo} alt="Python Logo" className="w-40 h-40 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                <br></br>
                <figcaption className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl font-bold">
                  Python
                </figcaption>
              </div>
            </AnimatedComponent>
            
            <br></br>
            
            <AnimatedComponent>
              <div className="relative">
                <img src={javascriptLogo} alt="JavaScript Logo" className="w-40 h-40 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                <br></br>
                <figcaption className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl font-bold">
                  JavaScript
                </figcaption>
              </div>
            </AnimatedComponent>
            
            <br></br>
            
            <AnimatedComponent>
              <div className="relative">
                <img src={javaLogo} alt="Java Logo" className="w-40 h-40 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                <br></br>
                <figcaption className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl font-bold">
                  Java
                </figcaption>
              </div>
            </AnimatedComponent>
          </div>


          <div className="flex flex-col items-center mb-8">
            <AnimatedComponent>
              <div className="relative">
                <img src={htmlLogo} alt="HTML Logo" className="w-40 h-40 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                <br></br>
                <figcaption className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl font-bold">
                  HTML
                </figcaption>
              </div>
            </AnimatedComponent>
            
            <br></br>
            
            <AnimatedComponent>
              <div className="relative">
                <img src={cssLogo} alt="CSS Logo" className="w-40 h-40 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                <br></br>
                <figcaption className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl font-bold">
                  CSS
                </figcaption>
              </div>
            </AnimatedComponent>
            
            <br></br>
            
            <AnimatedComponent>
              <div className="relative">
                <img src={vuejsLogo} alt="Vue.js Logo" className="w-40 h-40 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                <br></br>
                <figcaption className="absolute bottom-0 left-0 right-0 text-center text-white text-2xl font-bold">
                  Vue.js
                </figcaption>
              </div>
            </AnimatedComponent>
          </div>


          <div className="flex flex-col space-y-8">
            {/* Card 1 */}
            <AnimatedComponent>
              <div className="card card-side bg-white bg-opacity-5 rounded-2xl p-8 flex items-center w-full justify-between shadow-blue">
                <div className="text-container text-left pr-8">
                  <h3 className="text-2xl font-bold mb-4">SD Dian Kencana Bandung</h3>
                  <img src={dkImage} alt="SD Dian Kencana" className="w-32 h-32 object-cover mb-4 rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out" />
                  <a href="https://maps.app.goo.gl/vN71DfqPnjj7krU6A" className="btn bg-purple-700 text-lg text-white hover:bg-purple-700 mt-8">
                    View Details
                  </a>
                </div>
              </div>
            </AnimatedComponent>

            <AnimatedComponent>
              <div className="card card-side bg-white bg-opacity-5 rounded-2xl p-8 flex items-center w-full justify-between shadow-blue">
                <div className="text-container text-left pr-8">
                  <h3 className="text-2xl font-bold mb-4">SMP Al Azhar 36 Bandung</h3>
                  <img src={alazharImage} alt="SMP Al Azhar 36" className="w-32 h-32 object-cover mb-4 rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out" />
                  <a href="https://maps.app.goo.gl/eC5tQ6ExGtKjyvkJ8" className="btn bg-purple-700 text-lg text-white hover:bg-purple-700 mt-8">
                    View Details
                  </a>
                </div>
              </div>
            </AnimatedComponent>

            <AnimatedComponent>
              <div className="card card-side bg-white bg-opacity-5 rounded-2xl p-8 flex items-center w-full justify-between shadow-blue">
                <div className="text-container text-left pr-8">
                  <h3 className="text-2xl font-bold mb-4">SMKN 4 Bandung</h3>
                  <img src={smk4Image} alt="SMKN 4 Bandung" className="w-32 h-32 object-cover mb-4 rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out" />
                  <a href="https://maps.app.goo.gl/NJnfBYNeLajKZSpT6" className="btn bg-purple-700 text-lg text-white hover:bg-purple-700 mt-8">
                    View Details
                  </a>
                </div>
              </div>
            </AnimatedComponent>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-20 mt-10">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Wanna Join Our Group Project?</h2>
  <form onSubmit={handleFormSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleInputChange}
      placeholder="Nama"
      required
      className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      name="job"
      value={form.job}
      onChange={handleInputChange}
      placeholder="Job"
      required
      className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="number"
      name="umur"
      value={form.umur}
      onChange={handleInputChange}
      placeholder="Umur"
      required
      className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200"
    >
      {form.id ? 'Update' : 'Add'}
    </button>
  </form>
  <table className="table-auto w-full bg-white bg-opacity-5 rounded-lg shadow-lg mt-4">
    <thead>
      <tr className="bg-gray-800 text-white">
        <th className="px-4 py-2">ID</th>
        <th className="px-4 py-2">Nama</th>
        <th className="px-4 py-2">Job</th>
        <th className="px-4 py-2">Umur</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item: any) => (
        <tr key={item.id} className="bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200">
          <td className="border-t border-gray-700 px-4 py-2">{item.id}</td>
          <td className="border-t border-gray-700 px-4 py-2">{item.Nama}</td>
          <td className="border-t border-gray-700 px-4 py-2">{item.Job}</td>
          <td className="border-t border-gray-700 px-4 py-2">{item.Umur}</td>
          <td className="border-t border-gray-700 px-4 py-2 space-x-2">
            <button
              onClick={() => handleEdit(item)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <div style={{ height: '5vh' }}></div>
    </div>
  );
}

export default App;
