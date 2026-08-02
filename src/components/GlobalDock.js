"use client";

import { useState, useEffect } from "react";
import Dock from "./Dock";
import { VscHome, VscArchive, VscAccount, VscBriefcase, VscMail } from "react-icons/vsc";

export default function GlobalDock() {
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Only show dock after intro on homepage, or immediately on other pages
    if (window.location.pathname === "/") {
      const timer = setTimeout(() => {
        setMounted(true);
      }, 3000); // Approximate time for IntroLoader
      return () => clearTimeout(timer);
    } else {
      setMounted(true);
    }
  }, []);

  // Listen to body class mutations for modal-open state
  useEffect(() => {
    const checkModal = () => {
      setIsModalOpen(document.body.classList.contains("modal-open"));
    };
    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!mounted || isModalOpen) return null;

  const dockItems = [
    { 
      icon: <VscHome size={18} />, 
      label: 'Home', 
      onClick: () => {
        if (window.location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = "/";
        }
      } 
    },
    { 
      icon: <VscArchive size={18} />, 
      label: 'Work', 
      onClick: () => {
        if (window.location.pathname === "/portfolio") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = "/portfolio";
        }
      } 
    },
    { 
      icon: <VscAccount size={18} />, 
      label: 'About', 
      onClick: () => {
        if (window.location.pathname === "/about") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = "/about";
        }
      } 
    },
    { 
      icon: <VscBriefcase size={18} />, 
      label: 'Services', 
      onClick: () => {
        if (window.location.pathname === "/services") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = "/services";
        }
      } 
    },
    { 
      icon: <VscMail size={18} />, 
      label: 'Contact', 
      onClick: () => {
        window.location.href = "/contact";
      } 
    }
  ];

  return (
    <Dock 
      items={dockItems}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
}
