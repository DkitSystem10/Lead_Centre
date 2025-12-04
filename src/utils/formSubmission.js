import { supabase, uploadFile } from '../lib/supabase'

/**
 * Submit Vendor Application
 */
export const submitVendorApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'vendor')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
        // Continue without file URL
      }
    }

    const { data, error } = await supabase
      .from('vendor_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          vendor_name: formData.vendorName,
          company_name: formData.companyName,
          company_address: formData.companyAddress,
          email: formData.email,
          phone_number: formData.phoneNumber,
          appointment_status: formData.appointmentStatus,
          business_type: formData.businessType,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting vendor application:', error)
    throw error
  }
}

/**
 * Submit B2B Application
 */
export const submitB2BApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'b2b')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('b2b_applications')
      .insert([
        {
          date: formData.date,
          contact_person_name: formData.contactPersonName,
          organization_name: formData.organizationName,
          organization_address: formData.organizationAddress,
          business_type: formData.businessType,
          mode_of_business: formData.modeOfBusiness,
          company_website_email: formData.companyWebsiteEmail,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting B2B application:', error)
    throw error
  }
}

/**
 * Submit Partners Application
 */
export const submitPartnersApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'partners')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('partner')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          contact_person_name: formData.contactPersonName,
          organization_name: formData.organizationName,
          organization_address: formData.organizationAddress,
          email: formData.email,
          phone_number: formData.phoneNumber,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting partners application:', error)
    throw error
  }
}

/**
 * Submit Job Seeker Application
 */
export const submitJobSeekerApplication = async (formData) => {
  try {
    let uploadResumeUrl = null

    // Upload resume if provided (don't fail if upload fails)
    if (formData.uploadResume) {
      try {
        uploadResumeUrl = await uploadFile(formData.uploadResume, 'applications', 'job-seekers')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('job_seeker_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          full_name: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          age: parseInt(formData.age) || 0,
          address: formData.address,
          blood_group: formData.bloodGroup,
          contact_number: formData.contactNumber,
          email: formData.email,
          qualification: formData.qualification,
          department: formData.department,
          years_of_experience: formData.yearsOfExperience,
          preferred_job_type: formData.preferredJobType,
          upload_resume_url: uploadResumeUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting job seeker application:', error)
    throw error
  }
}

/**
 * Submit Student Internship Application
 */
export const submitStudentInternshipApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'student-internship')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('student_internship_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          full_name: formData.fullName,
          registration_number: formData.registrationNumber,
          address: formData.address,
          email: formData.email,
          contact_number: formData.contactNumber,
          blood_group: formData.bloodGroup,
          dob: formData.dob,
          age: parseInt(formData.age) || 0,
          gender: formData.gender,
          college_institution_name: formData.collegeInstitutionName,
          course_type: formData.courseType,
          department: formData.department,
          internship_domain: formData.internshipDomain,
          duration: formData.duration,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting student internship application:', error)
    throw error
  }
}

/**
 * Submit Career Guidance Application
 */
export const submitCareerGuidanceApplication = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('career_guidance_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          student_name: formData.studentName,
          standard_year: formData.standardYear,
          date_of_birth: formData.dateOfBirth,
          age: parseInt(formData.age) || 0,
          gender: formData.gender,
          location: formData.location,
          contact_number: formData.contactNumber,
          email: formData.email,
          parent_guardian_name: formData.parentGuardianName,
          studies_preference: formData.studiesPreference,
          abroad_local: formData.abroadLocal,
          preferred_country: formData.preferredCountry || null,
          city_if_abroad: formData.cityIfAbroad || null,
          preferred_university: formData.preferredUniversity || null,
          career_interest: formData.careerInterest || null,
          skills_strengths: formData.skillsStrengths || null,
          academic_performance: formData.academicPerformance || null,
          hobbies_extracurricular: formData.hobbiesExtracurricular || null,
          preferred_mode_of_study: formData.preferredModeOfStudy,
          career_support_duration: formData.careerSupportDuration,
          mentorship_required: formData.mentorshipRequired,
          remarks_notes: formData.remarksNotes || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting career guidance application:', error)
    throw error
  }
}

/**
 * Submit Training Session Application
 */
export const submitTrainingSessionApplication = async (formData) => {
  try {
    // Collect assessment answers from form
    // Map question IDs to questions for better structure
    const assessment = {}
    if (formData.assessment && typeof formData.assessment === 'object') {
      // Transform assessment object to include question text
      Object.keys(formData.assessment).forEach(questionId => {
        assessment[`question_${questionId}`] = formData.assessment[questionId]
      })
    }

    const { data, error } = await supabase
      .from('training_session_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category || null,
          sub_category: formData.subCategory || null,
          trainer_name: formData.trainerName,
          topic: formData.topic,
          student_reg_no: formData.studentRegNo,
          participant_name: formData.participantName,
          gender: formData.gender,
          email: formData.email,
          address: formData.address,
          assessment: Object.keys(assessment).length > 0 ? assessment : null,
          feedback: formData.feedback || null,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting training session application:', error)
    throw error
  }
}

