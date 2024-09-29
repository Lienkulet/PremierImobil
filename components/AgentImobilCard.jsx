import React from 'react'

const AgentImobilCard = ({agentId, photoUrl, name, phoneNr}) => {
  return (
    <div className="flex flex-row items-center gap-8">
    {property.agentId.photoUrl && (
        <Link href={`/agentproprietati/${property.agentId}`}>
        <img
            src={property.agentId.photoUrl}
            alt="Agent's Photo"
            className="rounded-3xl w-[170px] h-[300px]"
        />
        </Link>
    )}
    <div className="flex flex-col">
        <h4 className="text-lg font-semibold text-textGrey">Specialist Imobiliar</h4>
        <h4 className="text-xl mt-4 font-semibold text-white">{property.agentId.name}</h4>
        <a href={`tel:${property.agentId.phoneNr}`} className="text-lg text-textGrey mt-2 gap-4">Telefon:
            <span className="text-xl text-mainOrange">  {property.agentId.phoneNr}
            </span>
        </a>
    </div>
</div>  )
}

export default AgentImobilCard