export const getOptionsFor = (values) =>
  values.map(({ id, name }) => {
    return { value: id, label: name };
  });

export const getAlumniFilters = (alumni) =>
  alumni?.reduce(
    (filters, alumnus) => {
      return {
        ...filters,
        Designation: [
          ...new Set([...filters.Designation, alumnus.designation]),
        ],
        GraduationLevel: [
          ...new Set([
            ...filters.GraduationLevel,
            alumnus.user.graduationLevel,
          ]),
        ],
        Entrepreneur: [
          ...new Set([
            ...filters.Entrepreneur,
            alumnus.isEntrepreneur ? "Yes" : "No",
          ]),
        ],
        City: [...new Set([...filters.City, alumnus.user.city])],
        "Year of Passing": [
          ...new Set([
            ...filters["Year of Passing"],
            new Date(alumnus.user.yearOfPassing).getFullYear(),
          ]),
        ],
        Organization: [
          ...new Set([...filters.Organization, alumnus.organization]),
        ],
      };
    },
    {
      Designation: [],
      GraduationLevel: [],
      Entrepreneur: [],
      City: [],
      Organization: [],
      "Year of Passing": [],
    }
  );

export const filterForField = (filters, field, data) => {
  return filters[field]?.length !== 0 ? filters[field]?.includes(data) : true;
};

export const filterAlumniData = (alumniData, filters) =>
  alumniData.filter((alumnus) => {
    return (
      filterForField(filters, "Designation", alumnus.designation) &&
      filterForField(filters, "City", alumnus.user.city) &&
      filterForField(
        filters,
        "Entrepreneur",
        alumnus.isEntrepreneur ? "Yes" : "No"
      ) &&
      filterForField(
        filters,
        "GraduationLevel",
        alumnus.user.graduationLevel
      ) &&
      filterForField(filters, "Organization", alumnus.organization) &&
      filterForField(
        filters,
        "Year of Passing",
        new Date(alumnus.user.yearOfPassing).getFullYear()
      )
    );
  });

export const getAlumniDataFilters = (alumni) =>
  alumni?.reduce(
    (filters, alumnus) => {
      return {
        ...filters,
        Designation: [
          ...new Set([...filters.Designation, alumnus.designation]),
        ],

        Company: [...new Set([...filters.Company, alumnus.company])],
        Batch: [...new Set([...filters.Batch, alumnus.batch])],
        CompanyAddress: [
          ...new Set([...filters.CompanyAddress, alumnus.companyAddress]),
        ],
      };
    },
    {
      Designation: [],
      Company: [],
      Batch: [],
      CompanyAddress: [],
    }
  );

export const filterOldAlumniData = (alumniData, filters) =>
  alumniData.filter((alumnus) => {
    return (
      filterForField(filters, "Designation", alumnus.designation) &&
      filterForField(filters, "Company", alumnus.company) &&
      filterForField(filters, "Batch", alumnus.batch) &&
      filterForField(filters, "companyAddress", alumnus.companyAddress)
    );
  });
