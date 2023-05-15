import { gql, request } from "graphql-request";

const graphqlAPI: string = process.env.NEXT_PUBLIC_CMS_ENDPOINT || "";

export const getCommon = async () => {
  const query = gql`
    query MyQuery {
      commons(orderBy: publishedAt_DESC) {
        id
        name
        hotline
        email
        slogan
        address
        member
        total_client
        years
        province
        logo {
          url
        }
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.commons;
};

export const getCourses = async () => {
  const query = gql`
    query MyQuery {
      courses(orderBy: publishedAt_DESC, last: 8) {
        id
        slug
        title
        thumbnail {
          url
        }
        description
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.courses;
};

export const getAllCourses = async () => {
  const query = gql`
    query MyQuery {
      courses {
        id
        slug
        title
        thumbnail {
          url
        }
        description
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.courses;
};

export const getSlugCourses = async () => {
  const query = gql`
    query MyQuery {
      courses {
        slug
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.courses;
};

export const getSlugBlogs = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { category: { _search: "Tin tức" } }) {
        slug
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.blogs;
};

export const getCourseDetail = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      course(where: { slug: $slug }) {
        content {
          raw
        }
        duration
        schedule
        title
        image_url {
          url
        }
        description
        thumbnail {
          url
        }
        createdAt
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.course;
};

export const getBlogDetail = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blog(where: { slug: $slug }) {
        updatedAt
        content {
          raw
        }
        title
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.blog;
};

export const getProjectDetail = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      project(where: { slug: $slug }) {
        title
        updatedAt
        content {
          raw
        }
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.project;
};

export const getServiceDetail = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      service(where: { slug: $slug }) {
        content {
          raw
        }
        title
        updatedAt
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.service;
};

export const getOtherCourses = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      courses(where: { NOT: { slug: $slug } }) {
        id
        title
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.courses;
};

export const getOtherBlog = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blogs(where: { NOT: { slug: $slug } }) {
        id
        title
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.blogs;
};

export const getCarousels = async () => {
  const query = gql`
    query MyQuery {
      carousels {
        banner {
          url
        }
        id
        title
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.carousels;
};

export const getAllNews = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { category: { _search: "Tin Tức" } }) {
        slug
        title
        description
        id
        createdAt
        content {
          raw
        }
        category {
          title
        }
        thumbnail {
          url
        }
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.blogs;
};

export const getServices = async () => {
  const query = gql`
    query MyQuery {
      services {
        id
        slug
        title
        content {
          raw
        }
        description
        thumbnail {
          url
        }
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.services;
};

export const getProjects = async () => {
  const query = gql`
    query MyQuery {
      projects {
        id
        slug
        title
        createdAt
        image {
          url
        }
        description
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.projects;
};

export const getAbouts = async () => {
  const query = gql`
    query MyQuery {
      abouts {
        id
        updatedAt
        content {
          raw
        }
      }
    }
  `;

  const result: any = await request(graphqlAPI, query);
  return result.abouts;
};

export const getServiceIds = async () => {
  const query = gql`
    query MyQuery {
      services {
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.services;
};

export const getProjectIds = async () => {
  const query = gql`
    query MyQuery {
      projects {
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.projects;
};

export const getPartner = async () => {
  const query = gql`
    query MyQuery {
      partners {
        id
        logo {
          url
        }
        title
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.partners;
};

export const getTestimonials = async () => {
  const query = gql`
    query MyQuery {
      feedbacks {
        avatar {
          url
        }
        id
        message
        name
        role
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.feedbacks;
};

export const getLinks = async () => {
  const query = gql`
    query MyQuery {
      links {
        link
        id
        title
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.links;
};

export const getResearchs = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { category: { _search: "NCKH-CGCN" } }) {
        id
        title
        createdAt
        description
        slug
        thumbnail {
          url
        }
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.blogs;
};

export const getResearchSlugs = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { category: { _search: "NCKH-CGCN" } }) {
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.blogs;
};

export const getResearchDetail = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blog(where: { slug: $slug }) {
        updatedAt
        content {
          raw
        }
        title
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.blog;
};

export const getOtherResearch = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blogs(
        where: { category: { _search: "NCKH-CGCN" }, NOT: { slug: $slug } }
      ) {
        id
        title
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.blogs;
};

export const getCooperation = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { category: { _search: "Hợp tác quốc tế" } }) {
        id
        title
        createdAt
        description
        slug
        thumbnail {
          url
        }
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.blogs;
};

export const getCooperationSlugs = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { category: { _search: "Hợp tác quốc tế" } }) {
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query);
  return result.blogs;
};

export const getOtherCooperation = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blogs(
        where: {
          category: { _search: "Hợp tác quốc tế" }
          NOT: { slug: $slug }
        }
      ) {
        id
        title
        slug
      }
    }
  `;
  const result: any = await request(graphqlAPI, query, { slug });
  return result.blogs;
};
