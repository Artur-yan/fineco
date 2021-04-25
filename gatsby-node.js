const _ = require("lodash");
const path = require("path");
const { slash } = require(`gatsby-core-utils`);

const createProjectPages = async ({ createPage, graphql }) => {
  const {
    data: { projects },
  } = await graphql(`
    {
      projects: allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { type: { eq: "project" } } }
      ) {
        edges {
          node {
            id
            fields {
              relativePath
            }
          }
        }
      }
    }
  `);

  projects.edges.forEach((e) => {
    createPage({
      path: e.node.fields.relativePath,
      component: path.resolve(`src/templates/ProjectTemplate.tsx`),
      // additional data can be passed via context
      context: {
        id: e.node.id,
      },
    });
  });
};

function createRegularPages({ createPage, graphql }) {
  return graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "pages" }, extension: { eq: "md" } }
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              fields {
                relativePath
              }
              frontmatter {
                templateKey
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const files = result.data.allFile.edges;

    files.forEach((edge) => {
      const id = edge.node.id;

      if (edge.node.childMarkdownRemark.frontmatter.templateKey) {
        createPage({
          path: edge.node.childMarkdownRemark.fields.relativePath,
          component: path.resolve(
            `src/templates/${String(
              edge.node.childMarkdownRemark.frontmatter.templateKey
            )}.tsx`
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        });
      }
    });
  });
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  try {
    await createProjectPages({ createPage, graphql });
  } catch (e) {
    console.log(e);
    // e.forEach((e) => console.error(e.toString()));
    return Promise.reject(e);
  }

  return createRegularPages({ createPage, graphql });
};

function findFileNode({ node, getNode }) {
  // Find the file node.
  let fileNode = node;
  let whileCount = 0;

  while (
    fileNode.internal.type !== `File` &&
    fileNode.parent &&
    getNode(fileNode.parent) !== undefined &&
    whileCount < 101
  ) {
    fileNode = getNode(fileNode.parent);
    whileCount += 1;

    if (whileCount > 100) {
      console.log(
        `It looks like you have a node that's set its parent as itself`,
        fileNode
      );
    }
  }

  return fileNode;
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node?.internal.type === `MarkdownRemark`) {
    const fileNode = findFileNode({
      node,
      getNode,
    });
    if (!fileNode) return undefined;

    const relativePath = path.posix.relative(
      slash("src/pages"),
      slash(fileNode.relativePath)
    );
    const { dir = ``, name } = path.parse(relativePath);

    // if a slug is present inthe frontmatter, is is going to be used instead of the file name
    const parsedName = node?.frontmatter.slug || (name === `index` ? `` : name);
    const value = path.posix.join(`/`, dir, parsedName, `/`);

    createNodeField({
      name: `relativePath`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemarkFrontmatterSectionsRows implements Node {
      image: File @fileByRelativePath
      video: File @fileByRelativePath
    }

    type MarkdownRemarkFrontmatterRows implements Node {
      image: File @fileByRelativePath
      video: File @fileByRelativePath
    }
  `;
  createTypes(typeDefs);
};
