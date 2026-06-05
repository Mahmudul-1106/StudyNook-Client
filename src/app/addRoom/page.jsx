// "use client";

// import { authClient } from "@/lib/auth-client";
// import {
//   Button,
//   Description,
//   FieldError,
//   FieldGroup,
//   Fieldset,
//   Form,
//   Input,
//   Label,
//   TextArea,
//   TextField,
//   Checkbox,
//   CheckboxGroup,
//   NumberField,
// } from "@heroui/react";
// import {
//   MdPublishedWithChanges,
//   MdOutlineLayers,
//   MdPeople,
//   MdAttachMoney,
// } from "react-icons/md";
// import { HiOutlineSparkles } from "react-icons/hi2";
// import toast from "react-hot-toast";
// import { useState } from "react";

// const addRoomPage = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [formKey, setFormKey] = useState(0);
//   const [selectedAmenities, setSelectedAmenities] = useState([]);

//   const handleReset = () => {
//     setSelectedAmenities([]);
//     setFormKey((prev) => prev + 1); // Wipes out all field components instantly
//   };

//   const amenities = [
//     "Whiteboard",
//     "Projector",
//     "High-Speed Wi-Fi",
//     "Power Outlets",
//     "Quiet Zone",
//     "Air Conditioning",
//   ];

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (selectedAmenities.length === 0) {
//       toast.error("Please select at least one amenity");
//       return;
//     }

//     const formElement = e.nativeEvent?.target || e.target;
//     const formData = new FormData(formElement);

//     const finalFormPayload = {
//       name: formData.get("name"),
//       bio: formData.get("bio"),
//       image: formData.get("image"),
//       floor: formData.get("floor"),
//       capacity: Number(formData.get("capacity")),
//       pricePerHour: Number(formData.get("pricePerHour")),
//       amenities: selectedAmenities, // Syncs perfectly with React State
//       userId: user?.id || null,
//       userEmail: user?.email || null,
//     };

//     try {
//       console.log("Unified Submission Payload:", finalFormPayload);

//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(finalFormPayload),
//       });

//       if (!res.ok) {
//         throw new Error(`Server responded with status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.acknowledged) {
//         toast.success("Room Added Successfully");
//         handleReset();
//         console.log(data);
//       }
//     } catch (error) {
//       console.error("Submission failed:", error);
//       toast.error("Failed to add room. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-50 via-slate-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
//       {/* Decorative Grid Patterns in Backdrop */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

//       <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
//         {/* Left Side: Editorial Descriptive Banner */}
//         <div className="lg:col-span-4 text-left lg:pt-6">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/50 border border-cyan-200/50 dark:border-cyan-900/30 text-[#344E41] dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-xs">
//             <HiOutlineSparkles className="text-sm text-[#344E41] dark:text-cyan-400 animate-pulse" />
//             Add Workspace
//           </div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
//             List Your Space on{" "}
//             <span className="text-transparent bg-clip-text bg-linear-to-r from-[#588157] to-[#3A5A40] dark:from-cyan-400 dark:to-blue-400">
//               StudyNook
//             </span>
//           </h1>
//           <p className="mt-4 text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
//             Share your premium rooms, dedicated single desks, or multi-member
//             group pods with students and digital nomads globally.
//           </p>
//           <div className="hidden lg:block mt-8 border-t border-slate-200 dark:border-zinc-800/60 pt-6">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
//               Hosting Checklist
//             </h3>
//             <ul className="space-y-2.5 text-xs text-slate-500 dark:text-zinc-500">
//               <li className="flex items-center gap-2">
//                 ✓ Set transparent hourly pricing layouts
//               </li>
//               <li className="flex items-center gap-2">
//                 ✓ Upload clean, direct URLs showcasing lighting
//               </li>
//               <li className="flex items-center gap-2">
//                 ✓ List active workspace utilities for bookings
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Right Side: The Styled Form Layout Card Container */}
//         <div className="lg:col-span-8 bg-[#DAD7CD] dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 overflow-hidden">
//           <Form key={formKey} className="p-6 sm:p-10" onSubmit={onSubmit}>
//             <Fieldset className="space-y-6">
//               <div>
//                 <Fieldset.Legend className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
//                   Add Room Details
//                 </Fieldset.Legend>
//                 <Description className="text-xs text-slate-400 dark:text-zinc-400 mt-1 block">
//                   Fill out structural fields cleanly to maximize room scheduling
//                   visibility.
//                 </Description>
//               </div>

//               <FieldGroup className="space-y-5">
//                 {/* Field: Room Name */}
//                 <TextField
//                   isRequired
//                   name="name"
//                   className="flex flex-col w-full"
//                   validate={(value) =>
//                     value.length < 3
//                       ? "Name must be at least 3 characters"
//                       : null
//                   }
//                 >
//                   <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300">
//                     Room Name
//                   </Label>
//                   <Input
//                     placeholder="Enter Room Name"
//                     className="mt-1.5 w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors"
//                   />
//                   <FieldError className="text-xs text-red-500 mt-1 font-medium" />
//                 </TextField>

//                 {/* Field: Description */}
//                 <TextField
//                   isRequired
//                   name="bio"
//                   className="flex flex-col w-full"
//                   validate={(value) =>
//                     value.length < 10
//                       ? "Bio must be at least 10 characters"
//                       : null
//                   }
//                 >
//                   <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300">
//                     Description
//                   </Label>
//                   <TextArea
//                     placeholder="Describe your workspace ..."
//                     rows={4}
//                     className="mt-1.5 w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors resize-none"
//                   />
//                   <div className="flex justify-between items-center mt-1">
//                     <Description className="text-xs text-slate-400 dark:text-zinc-500">
//                       Minimum 10 characters required.
//                     </Description>
//                   </div>
//                   <FieldError className="text-xs text-red-500 mt-1 font-medium" />
//                 </TextField>

//                 {/* Field: Image URL */}
//                 <TextField
//                   isRequired
//                   name="image"
//                   type="url"
//                   className="flex flex-col w-full"
//                 >
//                   <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300">
//                     Room Image URL
//                   </Label>
//                   <Input
//                     placeholder="https://...Your Premium Room Photo..."
//                     className="mt-1.5 w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors"
//                   />
//                   <FieldError className="text-xs text-red-500 mt-1 font-medium" />
//                 </TextField>

//                 {/* 3-Column Metrics Layout */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50/60 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-900 rounded-xl shadow-inner">
//                   {/* Floor Level */}
//                   <TextField
//                     isRequired
//                     name="floor"
//                     className="flex flex-col w-full"
//                     validate={(value) =>
//                       value.length < 2 ? "Specify floor level" : null
//                     }
//                   >
//                     <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
//                       <MdOutlineLayers className="text-base text-slate-400" />{" "}
//                       Floor
//                     </Label>
//                     <Input
//                       placeholder="e.g. 3rd Floor"
//                       className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-cyan-500"
//                     />
//                     <FieldError className="text-xs text-red-500 mt-1" />
//                   </TextField>

//                   {/* Room Capacity */}
//                   <NumberField
//                     isRequired
//                     className="flex flex-col w-full"
//                     defaultValue={2}
//                     minValue={1}
//                     name="capacity"
//                   >
//                     <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
//                       <MdPeople className="text-base text-slate-400" /> Capacity
//                     </Label>
//                     <NumberField.Group className="flex items-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden focus-within:border-cyan-500 transition-colors h-[40px]">
//                       <NumberField.DecrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors h-full" />
//                       <NumberField.Input className="w-full text-center bg-transparent border-0 font-medium text-sm text-slate-800 dark:text-white" />
//                       <NumberField.IncrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors h-full" />
//                     </NumberField.Group>
//                   </NumberField>

//                   {/* Hourly Base Pricing */}
//                   <NumberField
//                     isRequired
//                     className="flex flex-col w-full"
//                     defaultValue={12}
//                     minValue={0}
//                     name="pricePerHour"
//                   >
//                     <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
//                       <MdAttachMoney className="text-base text-slate-400" />{" "}
//                       Hourly Rate
//                     </Label>
//                     <NumberField.Group className="flex items-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden focus-within:border-cyan-500 transition-colors h-[40px]">
//                       <NumberField.DecrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors h-full" />
//                       <NumberField.Input className="w-full text-center bg-transparent border-0 font-medium text-sm text-slate-800 dark:text-white" />
//                       <NumberField.IncrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors h-full" />
//                     </NumberField.Group>
//                   </NumberField>
//                 </div>

//                 {/* Amenity Toggles Grid */}
//                 <div className="p-6 bg-slate-50/60 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-900 rounded-xl">
//                   <h3 className="text-xs font-bold tracking-wider text-slate-500 dark:text-zinc-400 mb-5 block">
//                     <span className="uppercase">
//                       AMENITIES & SPACE INCLUSIONS{" "}
//                       <span className="text-red-500">*</span>
//                     </span>{" "}
//                     <span className="text-slate-400 font-normal lowercase">
//                       (Please select at least one amenity)
//                     </span>
//                   </h3>

//                   {/* Grid Layout */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
//                     {amenities?.map((amenity, index) => {
//                       const isChecked = selectedAmenities.includes(amenity);

//                       return (
//                         <div
//                           key={index}
//                           onClick={() => {
//                             setSelectedAmenities((prev) =>
//                               prev.includes(amenity)
//                                 ? prev.filter((item) => item !== amenity)
//                                 : [...prev, amenity],
//                             );
//                           }}
//                           className="flex items-center gap-3 cursor-pointer group select-none h-6"
//                         >
//                           {/* Custom Checkbox Frame */}
//                           <div
//                             className={`w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 grow-0 ${
//                               isChecked
//                                 ? "bg-blue-600 border-blue-600 shadow-xs"
//                                 : "bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 group-hover:border-slate-400"
//                             }`}
//                           >
//                             {isChecked && (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 className="w-2.5 h-2.5 text-white"
//                               >
//                                 <polyline points="20 6 9 17 4 12" />
//                               </svg>
//                             )}
//                           </div>

//                           {/* Text String */}
//                           <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none truncate">
//                             {amenity}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </FieldGroup>

//               {/* Action Buttons Row */}
//               <Fieldset.Actions className="flex flex-col sm:flex-row-reverse items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-900">
//                 <Button
//                   type="submit"
//                   className="w-full sm:w-auto bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
//                 >
//                   <MdPublishedWithChanges className="text-lg" />
//                   Publish Room
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={handleReset}
//                   className="w-full sm:w-auto bg-transparent border border-[#3A5A40] dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400 font-medium px-6 py-2.5 rounded-xl transition-all"
//                 >
//                   Reset Form
//                 </Button>
//               </Fieldset.Actions>
//             </Fieldset>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default addRoomPage;

// Updated
"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Checkbox,
  CheckboxGroup,
  NumberField,
} from "@heroui/react";
import {
  MdPublishedWithChanges,
  MdOutlineLayers,
  MdPeople,
  MdAttachMoney,
} from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useState } from "react";

const addRoomPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formKey, setFormKey] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleReset = () => {
    setSelectedAmenities([]);
    setFormKey((prev) => prev + 1);
  };

  const amenities = [
    "Whiteboard",
    "Projector",
    "High-Speed Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const formElement = e.nativeEvent?.target || e.target;
    const formData = new FormData(formElement);

    const finalFormPayload = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      image: formData.get("image"),
      floor: formData.get("floor"),
      capacity: Number(formData.get("capacity")),
      pricePerHour: Number(formData.get("pricePerHour")),
      amenities: selectedAmenities,

      // Extended User Metadata Profiles
      userId: user?.id || null,
      ownerEmail: user?.email || null,
      ownerName: user?.name || "Anonymous Host", // Captured for Owner Info Section
      ownerImage: user?.image || null,
    };

    try {
      const { data: tokenData } = await authClient.token();
      console.log("Unified Submission Payload:", finalFormPayload);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(finalFormPayload),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();

      if (data.acknowledged) {
        toast.success("Room Added Successfully");
        handleReset();
        console.log(data);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-50 via-slate-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        <div className="lg:col-span-4 text-left lg:pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/50 border border-cyan-200/50 dark:border-cyan-900/30 text-[#344E41] dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-xs">
            <HiOutlineSparkles className="text-sm text-[#344E41] dark:text-cyan-400 animate-pulse" />
            Add Workspace
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            List Your Space on{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#588157] to-[#3A5A40] dark:from-cyan-400 dark:to-blue-400">
              StudyNook
            </span>
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            Share your premium rooms, dedicated single desks, or multi-member
            group pods with students and digital nomads globally.
          </p>
        </div>

        <div className="lg:col-span-8 bg-[#DAD7CD] dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 overflow-hidden">
          <Form key={formKey} className="p-6 sm:p-10" onSubmit={onSubmit}>
            <Fieldset className="space-y-6">
              <div>
                <Fieldset.Legend className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Add Room Details
                </Fieldset.Legend>
                <Description className="text-xs text-slate-400 dark:text-zinc-400 mt-1 block">
                  Fill out structural fields cleanly to maximize room scheduling
                  visibility.
                </Description>
              </div>

              <FieldGroup className="space-y-5">
                <TextField
                  isRequired
                  name="name"
                  className="flex flex-col w-full"
                  validate={(value) =>
                    value.length < 3
                      ? "Name must be at least 3 characters"
                      : null
                  }
                >
                  <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300">
                    Room Name
                  </Label>
                  <Input
                    placeholder="Enter Room Name"
                    className="mt-1.5 w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors"
                  />
                  <FieldError className="text-xs text-red-500 mt-1 font-medium" />
                </TextField>

                <TextField
                  isRequired
                  name="bio"
                  className="flex flex-col w-full"
                  validate={(value) =>
                    value.length < 10
                      ? "Bio must be at least 10 characters"
                      : null
                  }
                >
                  <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300">
                    Description
                  </Label>
                  <TextArea
                    placeholder="Describe your workspace ..."
                    rows={4}
                    className="mt-1.5 w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors resize-none"
                  />
                  <FieldError className="text-xs text-red-500 mt-1 font-medium" />
                </TextField>

                <TextField
                  isRequired
                  name="image"
                  type="url"
                  className="flex flex-col w-full"
                >
                  <Label className="text-sm font-semibold text-slate-800 dark:text-zinc-300">
                    Room Image URL
                  </Label>
                  <Input
                    placeholder="https://..."
                    className="mt-1.5 w-full bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 focus:border-cyan-500 transition-colors"
                  />
                  <FieldError className="text-xs text-red-500 mt-1 font-medium" />
                </TextField>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50/60 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-900 rounded-xl shadow-inner">
                  <TextField
                    isRequired
                    name="floor"
                    className="flex flex-col w-full"
                    validate={(value) =>
                      value.length < 1 ? "Specify floor level" : null
                    }
                  >
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
                      <MdOutlineLayers className="text-base text-slate-400" />{" "}
                      Floor
                    </Label>
                    <Input
                      placeholder="e.g. 3rd Floor"
                      className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-cyan-500"
                    />
                    <FieldError className="text-xs text-red-500 mt-1" />
                  </TextField>

                  <NumberField
                    isRequired
                    className="flex flex-col w-full"
                    defaultValue={2}
                    minValue={1}
                    name="capacity"
                  >
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
                      <MdPeople className="text-base text-slate-400" /> Capacity
                    </Label>
                    <NumberField.Group className="flex items-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden focus-within:border-cyan-500 transition-colors h-[40px]">
                      <NumberField.DecrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 h-full" />
                      <NumberField.Input className="w-full text-center bg-transparent border-0 font-medium text-sm text-slate-800 dark:text-white" />
                      <NumberField.IncrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 h-full" />
                    </NumberField.Group>
                  </NumberField>

                  <NumberField
                    isRequired
                    className="flex flex-col w-full"
                    defaultValue={12}
                    minValue={0}
                    name="pricePerHour"
                  >
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
                      <MdAttachMoney className="text-base text-slate-400" />{" "}
                      Hourly Rate
                    </Label>
                    <NumberField.Group className="flex items-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden focus-within:border-cyan-500 transition-colors h-[40px]">
                      <NumberField.DecrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 h-full" />
                      <NumberField.Input className="w-full text-center bg-transparent border-0 font-medium text-sm text-slate-800 dark:text-white" />
                      <NumberField.IncrementButton className="px-3 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 h-full" />
                    </NumberField.Group>
                  </NumberField>
                </div>

                <div className="p-6 bg-slate-50/60 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-900 rounded-xl">
                  <h3 className="text-xs font-bold tracking-wider text-slate-500 dark:text-zinc-400 mb-5 block uppercase">
                    AMENITIES & SPACE INCLUSIONS{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                    {amenities?.map((amenity, index) => {
                      const isChecked = selectedAmenities.includes(amenity);
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedAmenities((prev) =>
                              prev.includes(amenity)
                                ? prev.filter((item) => item !== amenity)
                                : [...prev, amenity],
                            );
                          }}
                          className="flex items-center gap-3 cursor-pointer group select-none h-6"
                        >
                          <div
                            className={`w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 ${isChecked ? "bg-blue-600 border-blue-600 shadow-xs" : "bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"}`}
                          >
                            {isChecked && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-2.5 h-2.5 text-white"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">
                            {amenity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FieldGroup>

              <Fieldset.Actions className="flex flex-col sm:flex-row-reverse items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-900">
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-linear-to-r from-[#588157] to-[#3A5A40] text-white font-semibold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MdPublishedWithChanges className="text-lg" /> Publish Room
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-transparent border border-[#3A5A40] text-slate-600 font-medium px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Reset Form
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default addRoomPage;
