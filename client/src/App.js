import Calendar from "./components/1-calendar/calendar";
import Map from "./components/2-Map/Map";
import RegisterLogin from "./Auth/Register-Login";
import ClusterMap from "./components/2-Map/ClusterMap ";


function App() {
  return (
    <div className="App">
      <RegisterLogin/>
       <Calendar />
        <ClusterMap />
       <Map />  
       
     
    </div>
  );
}

export default App;

