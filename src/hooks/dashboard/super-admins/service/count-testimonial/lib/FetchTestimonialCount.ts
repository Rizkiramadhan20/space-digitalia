import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import { CountTestimonial } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/schema";

export const useTestimonialManagement = (itemsPerPage: number = 6) => {
  const [testimonials, setTestimonials] = useState<CountTestimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    CountTestimonial[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<CountTestimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    number: "",
    description: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIAL_COUNT!)
      );
      const testimonialList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CountTestimonial[];
      setTestimonials(testimonialList);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    let result = [...testimonials];
    if (searchQuery) {
      result = result.filter((testimonial) =>
        testimonial.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    setFilteredTestimonials(result);
    setCurrentPage(0);
  }, [testimonials, searchQuery]);

  const pageCount = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentTestimonials = filteredTestimonials.slice(
    offset,
    offset + itemsPerPage
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleEdit = (testimonial: CountTestimonial) => {
    setIsEditing(true);
    setSelectedTestimonial(testimonial);
    setFormData({
      number: testimonial.number,
      description: testimonial.description,
    });
    (
      document.getElementById("testimonial_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.number || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      if (isEditing && selectedTestimonial) {
        await updateDoc(
          doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIAL_COUNT!,
            selectedTestimonial.id
          ),
          {
            number: formData.number,
            description: formData.description,
            updatedAt: new Date(),
          }
        );
        toast.success("Count testimonial updated successfully!");
      } else {
        await addDoc(
          collection(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIAL_COUNT!
          ),
          {
            number: formData.number,
            description: formData.description,
            createdAt: new Date(),
          }
        );
        toast.success("Count testimonial added successfully!");
      }
      await fetchTestimonials();
      resetForm();
    } catch {
      toast.error("Failed to save count testimonial");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ number: "", description: "" });
    setIsEditing(false);
    setSelectedTestimonial(null);
    (
      document.getElementById("testimonial_modal") as HTMLDialogElement
    )?.close();
  };

  const handleDeleteImage = (testimonialId: string) => {
    setTestimonialToDelete(testimonialId);
    (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
  };

  const confirmDelete = async () => {
    if (!testimonialToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteDoc(
        doc(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIAL_COUNT!,
          testimonialToDelete
        )
      );
      toast.success("Count testimonial deleted successfully!");
      await fetchTestimonials();
    } catch {
      toast.error("Failed to delete count testimonial");
    } finally {
      setDeleteLoading(false);
      setTestimonialToDelete(null);
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
    }
  };

  return {
    testimonials,
    filteredTestimonials,
    currentTestimonials,
    pageCount,
    currentPage,
    searchQuery,
    loading,
    isLoading,
    isEditing,
    selectedTestimonial,
    formData,
    deleteLoading,
    setSearchQuery,
    handlePageChange,
    handleEdit,
    handleFormSubmit,
    handleDeleteImage,
    confirmDelete,
    setFormData,
    resetForm,
  };
};
