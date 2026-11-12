import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const [selectedRole, setSelectedRole] = useState('patient');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    // Patient
    bloodGroup: '',
    gender: '',
    dateOfBirth: '',
    emergencyPhone: '',
    // Doctor
    specialization: '',
    licenseNumber: '',
    qualifications: '',
    experienceYears: '',
    // Staff
    staffRole: '',
    staffId: '',
    agreeToTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [registeredSuccessUser, setRegisteredSuccessUser] = useState(null);

  // Field change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  // Calculate password accuracy
  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;

    if (pwd.length < 6) {
      return {
        level: 'Weak',
        score: 1,
        color: 'bg-rose-500',
        text: 'text-rose-500',
        hint: 'Weak password: add more characters & numbers.',
      };
    }

    const hasLetters = /[a-zA-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);

    if (pwd.length >= 8 && hasLetters && hasNumbers && (hasSpecial || hasUpper)) {
      return {
        level: 'Strong',
        score: 3,
        color: 'bg-emerald-500',
        text: 'text-emerald-600',
        hint: 'Strong & secure password!',
      };
    }

    if ((hasLetters && hasNumbers) || pwd.length >= 8) {
      return {
        level: 'Medium',
        score: 2,
        color: 'bg-amber-500',
        text: 'text-amber-500',
        hint: 'Medium strength: add uppercase letters or symbols.',
      };
    }

    return {
      level: 'Weak',
      score: 1,
      color: 'bg-rose-500',
      text: 'text-rose-500',
      hint: 'Weak password: use a combination of letters & numbers.',
    };
  };

  const passwordStrength = getPasswordStrength(password);

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!formData.agreeToTerms) {
      setErrorMessage('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    // Role specific validation
    if (selectedRole === 'patient') {
      if (!formData.bloodGroup) {
        setErrorMessage('Please select a blood group.');
        return;
      }
    } else if (selectedRole === 'doctor') {
      if (!formData.specialization) {
        setErrorMessage('Please select your medical specialization.');
        return;
      }
    } else if (selectedRole === 'staff') {
      if (!formData.staffRole) {
        setErrorMessage('Please select your hospital department/role.');
        return;
      }
    }

    // Store in AuthContext
    const result = registerUser({
      role: selectedRole,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: password.trim(),
      ...(selectedRole === 'patient' && {
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        emergencyPhone: formData.emergencyPhone,
      }),
      ...(selectedRole === 'doctor' && {
        specialization: formData.specialization,
        licenseNumber: formData.licenseNumber,
        qualifications: formData.qualifications,
        experienceYears: formData.experienceYears,
      }),
      ...(selectedRole === 'staff' && {
        staffRole: formData.staffRole,
        staffId: formData.staffId,
      }),
    });

    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setRegisteredSuccessUser(result.user);
      setErrorMessage('');
    }
  };

  // SUCCESS REGISTRATION VIEW
  if (registeredSuccessUser) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-teal-50 border-4 border-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-100 text-teal-800 mb-2">
          Stored in Context
        </span>

        <h2 className="text-2xl font-extrabold text-slate-800">
          Registration Complete!
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Your profile has been saved in the system and is ready to sign in.
        </p>

        {/* User Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 mb-6 text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Assigned Hospital ID:</span>
            <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-xs">
              {registeredSuccessUser.id}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Full Name:</span>
            <span className="font-semibold text-slate-800">{registeredSuccessUser.fullName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Email:</span>
            <span className="text-slate-700">{registeredSuccessUser.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Role:</span>
            <span className="font-semibold capitalize text-teal-600">{registeredSuccessUser.role}</span>
          </div>
          {registeredSuccessUser.bloodGroup && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Blood Group:</span>
              <span className="font-semibold text-slate-800">{registeredSuccessUser.bloodGroup}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition cursor-pointer"
          >
            Proceed to Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setRegisteredSuccessUser(null);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                bloodGroup: '',
                gender: '',
                dateOfBirth: '',
                emergencyPhone: '',
                specialization: '',
                licenseNumber: '',
                qualifications: '',
                experienceYears: '',
                staffRole: '',
                staffId: '',
                agreeToTerms: false,
              });
              setPassword('');
              setConfirmPassword('');
            }}
            className="w-full py-2 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            Register Another Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-700 text-xs font-semibold mb-2">
          <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Hospital Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create an Account
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Register to access hospital services, appointments, and records.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Register As
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'patient', label: 'Patient' },
            { id: 'doctor', label: 'Doctor' },
            { id: 'staff', label: 'Staff / Pharmacy' },
          ].map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => {
                setSelectedRole(role.id);
                setErrorMessage('');
              }}
              className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedRole === role.id
                  ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm ring-2 ring-teal-500/20'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {selectedRole === 'doctor' ? 'Doctor Full Name' : selectedRole === 'staff' ? 'Staff Full Name' : 'Full Name'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={
                selectedRole === 'doctor'
                  ? 'e.g. Dr. Sarah Jenkins'
                  : selectedRole === 'staff'
                  ? 'e.g. Michael Scott'
                  : 'e.g. John Doe'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@hospital.org"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              />
            </div>
          </div>
        </div>

        {/* ================= PATIENT-ONLY FIELDS ================= */}
        {selectedRole === 'patient' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Blood Group <span className="text-rose-500">*</span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A +ve</option>
                  <option value="A-">A -ve</option>
                  <option value="B+">B +ve</option>
                  <option value="B-">B -ve</option>
                  <option value="O+">O +ve</option>
                  <option value="O-">O -ve</option>
                  <option value="AB+">AB +ve</option>
                  <option value="AB-">AB -ve</option>
                  <option value="Unknown">Don't Know</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 999-8888"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                />
              </div>
            </div>
          </>
        )}

        {/* ================= DOCTOR-ONLY FIELDS ================= */}
        {selectedRole === 'doctor' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Department / Specialization <span className="text-rose-500">*</span>
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                >
                  <option value="">Select Specialization</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="general">General Medicine</option>
                  <option value="surgery">General Surgery</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="oncology">Oncology</option>
                  <option value="gynecology">Gynecology</option>
                  <option value="ent">ENT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Medical License / Council No.
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. MED-REG-749102"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Qualifications
                </label>
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  placeholder="e.g. MBBS, MD, MS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  placeholder="e.g. 8"
                  min="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                />
              </div>
            </div>
          </>
        )}

        {/* ================= STAFF / PHARMACY FIELDS ================= */}
        {selectedRole === 'staff' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Hospital Department / Role <span className="text-rose-500">*</span>
              </label>
              <select
                name="staffRole"
                value={formData.staffRole}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              >
                <option value="">Select Role / Department</option>
                <option value="pharmacy">Pharmacy & Dispensary</option>
                <option value="laboratory">Laboratory & Pathology</option>
                <option value="nursing">Nursing & Ward</option>
                <option value="reception">Reception / Front Desk</option>
                <option value="billing">Billing & Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Staff / Employee ID
              </label>
              <input
                type="text"
                name="staffId"
                value={formData.staffId}
                onChange={handleInputChange}
                placeholder="e.g. STF-84910 or LIC-2024"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              />
            </div>
          </div>
        )}

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password with Strength / Accuracy */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password Accuracy Meter */}
            {passwordStrength && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Password Accuracy:</span>
                  <span className={`font-semibold ${passwordStrength.text}`}>
                    {passwordStrength.level}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordStrength.score >= 1 ? passwordStrength.color : 'bg-transparent'
                    }`}
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordStrength.score >= 2 ? passwordStrength.color : 'bg-transparent'
                    }`}
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordStrength.score >= 3 ? passwordStrength.color : 'bg-transparent'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{passwordStrength.hint}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                  confirmPassword && password === confirmPassword
                    ? 'border-emerald-300 bg-emerald-50/10 focus:border-emerald-500 focus:ring-emerald-500/20'
                    : confirmPassword && password !== confirmPassword
                    ? 'border-rose-300 bg-rose-50/10 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300 focus:border-teal-500 focus:ring-teal-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {confirmPassword && password === confirmPassword && (
              <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <span>✓ Passwords match</span>
              </p>
            )}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-rose-500 mt-1 font-medium">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <span className="text-xs text-slate-600">
              I agree to the{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="text-teal-600 hover:underline font-semibold">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-teal-600 hover:underline font-semibold">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition cursor-pointer"
          >
            Create {selectedRole === 'patient' ? 'Patient' : selectedRole === 'doctor' ? 'Doctor' : 'Staff'} Account
          </button>
        </div>
      </form>

      {/* Footer Navigation */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-teal-600 hover:text-teal-700 font-bold hover:underline ml-1">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
