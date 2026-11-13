import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const INITIAL_DEMO_USERS = [
  {
    id: 'MED-PT-100234',
    role: 'patient',
    fullName: 'Alexander Wright',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 234-5678',
    password: 'Password@123',
    bloodGroup: 'O+',
    gender: 'male',
    dateOfBirth: '1992-05-14',
    emergencyPhone: '+1 (555) 876-5432',
  },
  {
    id: 'MED-DOC-482910',
    role: 'doctor',
    fullName: 'Dr. Evelyn Vance',
    email: 'dr.vance@medpulse.org',
    phone: '+1 (555) 432-1098',
    password: 'Password@123',
    specialization: 'cardiology',
    licenseNumber: 'MD-REG-849201',
    qualifications: 'MBBS, MD (Cardiology)',
    experienceYears: '12',
  },
  {
    id: 'MED-STF-390123',
    role: 'staff',
    fullName: 'Michael Scott',
    email: 'michael.pharmacy@medpulse.org',
    phone: '+1 (555) 678-9012',
    password: 'Password@123',
    staffRole: 'pharmacy',
    staffId: 'PHR-84910',
  },
];

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(INITIAL_DEMO_USERS);
  const [currentUser, setCurrentUser] = useState(null);

  const registerUser = (userData) => {
    const emailExists = registeredUsers.some(
      (u) => u.email.trim().toLowerCase() === userData.email.trim().toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      };
    }

    // Generate unique Hospital ID
    const prefix = userData.role === 'patient' ? 'PT' : userData.role === 'doctor' ? 'DOC' : 'STF';
    const generatedId = `MED-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newUser = {
      ...userData,
      id: generatedId,
      createdAt: new Date().toISOString(),
    };

    // Store in Context state
    setRegisteredUsers((prev) => [newUser, ...prev]);

    return {
      success: true,
      message: 'Account registered successfully in Context!',
      user: newUser,
    };
  };

  // Evaluate / authenticate login against Context state
  const loginUser = ({ identifier, password, role }) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanId || !cleanPassword) {
      return {
        success: false,
        message: 'Please provide both email/hospital ID and password.',
      };
    }

    // Find user by email or assigned ID from Context state
    const foundUser = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        (u.id && u.id.toLowerCase() === cleanId) ||
        (u.staffId && u.staffId.toLowerCase() === cleanId)
    );

    if (!foundUser) {
      return {
        success: false,
        message: 'No registered account found with that email or ID. Please check or register first.',
      };
    }

    // Verify role if specified
    if (role && foundUser.role !== role) {
      return {
        success: false,
        message: `Role mismatch: This account is registered as "${foundUser.role.toUpperCase()}", not "${role.toUpperCase()}". Please switch the role tab.`,
      };
    }

    // Verify password
    if (foundUser.password !== cleanPassword) {
      return {
        success: false,
        message: 'Incorrect password. Please try again.',
      };
    }

    // Successful login - set in Context
    setCurrentUser(foundUser);
    return {
      success: true,
      message: `Welcome back, ${foundUser.fullName}!`,
      user: foundUser,
    };
  };

  // Sign out - clears active session in Context
  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        registeredUsers,
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
