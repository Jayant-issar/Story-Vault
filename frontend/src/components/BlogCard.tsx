import { Link } from "react-router-dom"

interface blogCardInput {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

export function BlogCard({ authorName, title, content, publishedDate, id }: blogCardInput) {
  const truncatedContent = content.length > 200 ? content.slice(0, 200) + " ....read more" : content;

  return (
    <Link to={'/blog/' + id}>
      <div className="bg-[#0C2D57] rounded-xl mt-2 shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <div className="text-[#EFECEC] text-xs uppercase font-medium tracking-wide flex items-center h-6">
            <Avatar name={authorName} />
            <div className=" py-4">
              <span className="inline-block bg-[#FFB0B0] rounded-full px-3 py-1 text-xs font-semibold text-[#0C2D57] mr-1 h-full">{authorName}</span>
            </div>
            ·  {publishedDate}
          </div>
          <div className="text-3xl font-semibold text-[#FFB0B0] mb-2 mt-1">{title}</div>
          <div className="text-[#EFECEC] text-base">
            <p>
              {truncatedContent}
            </p>
          </div>
          <div className=" border-t-[0.2px] mt-3 mb-1 px-1 text-[#EFECEC] font-extralight ">
            {Math.ceil(content.length / 300)} minute(s) read
          </div>
        </div>
      </div>
    </Link>
  )
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-[#FC6736] mr-2">
      <span className="font-medium text-[#EFECEC] dark:text-[#EFECEC]">{name[0]}</span>
    </div>
  )
}

export default BlogCard
