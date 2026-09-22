import { JHUCourse } from "@/types";
import catalogue from "./jhuFall2026Courses.json";

/**
 * Complete 2026–27 Johns Hopkins Academic Catalogue, sourced from the public
 * JHU e-Catalogue on September 22, 2026. SIS remains the authority for a
 * course's specific Fall 2026 section availability, instructor, and meeting time.
 */
export const JHU_FALL_2026_COURSES = catalogue as JHUCourse[];
