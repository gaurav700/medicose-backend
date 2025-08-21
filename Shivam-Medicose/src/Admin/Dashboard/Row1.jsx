import React, { useEffect, useState } from "react";
import { FaSun, FaCloudSun, FaCloudMoon } from "react-icons/fa";

export default function Row1() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [greetingIcon, setGreetingIcon] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateGreeting = () => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good Morning");
      setGreetingIcon(<FaSun size={24} />);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
      setGreetingIcon(<FaCloudSun size={24} />);
    } else {
      setGreeting("Good Evening");
      setGreetingIcon(<FaCloudMoon size={24} />);
    }
  };

  return (
    <div className="row1">
      <input type="search" placeholder="Search..." />
      <div className="last">
        <p className="greeting">
          {greetingIcon}
          &nbsp; {greeting}</p>
        <span>{currentTime.toLocaleString()}</span>
      </div>
    </div >
  );
}
